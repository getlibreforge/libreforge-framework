import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IComponent } from '@libreforge/libreforge-framework-shared';
import FormSubmitService from '../services/FormSubmitService';
import { ComponentUtils } from '../utils';
import { AbstractAction, ActionExecutionContext } from './AbstractAction';
import { DefaultI18nLookupService, SYMBOL_I18N_PROVIDER } from '../services';
import { AbstractValidationRule, SYMBOL_VALIDATION_RULE } from '../validation';
import { getArgsByRule } from '../utils/RuleUtils';

@injectable()
export class FormSubmitAction extends AbstractAction {

  name = 'SubmitForm';

  constructor(
      @inject(SYMBOL_I18N_PROVIDER) private i18nLookupService: DefaultI18nLookupService
      /* TODO: bring form validator here */
  ) {
    super();
  }

  getName() {
    return this.name;
  }

  async execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }> {

    const { componentId, pageComponents, currentPageState, dispatch, 
            container, pagination, collectionRefIdx, snackbar } = context;

    const submitButton = pageComponents[componentId];
    const url = submitButton.props['_x_url'] + (!!pagination ? `?size=${pagination.size}&page=${pagination.page}`: '');
    const method = submitButton.props['_x_method']

    console.debug(`FormSubmitAction called, url = ${url}, method - ${method}`);

    const utils = new ComponentUtils();
    /* Lookup for Form component */
    const form = utils.getParentOfType(submitButton, 'Form', pageComponents);
    if (!form || form.type !== 'Form') {
      throw new Error('Form not found. Sumit button must be within the Form');
    }

    /* Clean Business Rule error */
    await dispatch.app.setSharedErrorMessage({ message: undefined });
    
    console.warn(`collectionRefIdx = ${collectionRefIdx}`);

    /* Check if Form is within forEach and then change scope from Page to Row - TODO: move to utility */
    let pageStateScoped: any = {};
    const forEach = utils.getParentOfType(form, 'forEach', pageComponents);
    if (!!forEach && !!forEach.props['collectionRef'] && collectionRefIdx !== undefined) {
      console.warn(`collectionRef = ${forEach.props['collectionRef']}`);

      /* Change scope */
      pageStateScoped = currentPageState[forEach.props['collectionRef']][collectionRefIdx]; 
    } else {
      pageStateScoped = currentPageState;
    }

    /* Get page state to submit based on form components */
    const children: IComponent[] = utils.getChildrenOfTypes(form.children, 
      {'Input': 'Input', 'Textarea': 'Textarea', 'PasswordInput': 'PasswordInput', 'Checkbox': 'Checkbox', 
      'LocalDate': 'LocalDate', 'Select': 'Select'}, 
      pageComponents);

    /* Validate before submitting */
    const allRules = container.getAll<AbstractValidationRule>(SYMBOL_VALIDATION_RULE)
    const formErrors = {};
    children.forEach(child => {
      const ruleName = child.props['_x_rule'];
      if (!!ruleName) {
        const rule = allRules.filter(r => r.getName() === ruleName)[0];
        const errorMessage = rule.validate(child.id, getArgsByRule('_x_rule', rule, child.props), pageComponents, currentPageState);
        if (!!errorMessage) {
          // @ts-ignore
          formErrors[child.id] = errorMessage;
        }
      }
    });
    await dispatch.app.changeCurrentPageState({ name: 'formErrors', value: formErrors });

    if (Object.keys(formErrors).length > 0) {
      return { next: false, result: undefined };
    }

    /* Submitting */
    const variables = children.map(child => child.props['_x_name']);

    const payload: Record<string, any> = {}
    variables.map(name => {
      const valueByName = pageStateScoped[name];
      payload[name] = valueByName
    });

    const response = await FormSubmitService.submit("", url, method, payload, {});
    if (response.status === 422) {
      /* Business rules validation error */

      const error = await response.json();
      await dispatch.app.setSharedErrorMessage({ message: this.i18nLookupService.t(error.code, {}) });
      return { next: false, result: undefined };

    } else if (!response.ok) {
      snackbar.error(this.i18nLookupService.t(`Invalid response - ${response.status} ${response.statusText}`, {}));
      return { next: false, result: undefined };
    }

    const headers = response.headers;
    const data = await response.json();

    return { next: true, result: { data, headers } };
  }
}
