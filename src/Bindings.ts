import { Container } from 'inversify';
import { DataProvider, SYMBOL_DATA_PROVIDER } from './providers/DataProvider';
import { SampleDictionaryDataProvider } from './providers/SampleDictionaryDataProvider';
import { AbstractAction, SYMBOL_ACTION_PROVIDER } from './actions/AbstractAction';
import { SYMBOL_VALUE_CHANGE_ACTION, AbstractValueChangeAction } from './actions/AbstractValueChangeAction';
import { DefaultValueChangeAction } from './actions/DefaultValueChangeAction';
import { ClickByRefAction, DebugStateAction, ExecuteScriptAction, ExtractLocationDataAction, ExtractResponseDataAction, FetchAction, RouteToNextWizardStepAction, RouteToPageRedirectAwareAction, RouteToPrevWizardStepAction, StoreDataAction } from './actions';
import { FormSubmitAction } from './actions/FormSubmitAction';
import { AbstractI18nLookupService, ActionVariableEvaluationService, DefaultI18nLookupService, SYMBOL_ACTION_VARIABLE_EVAL_SERVICE, SYMBOL_I18N_PROVIDER } from './services';
import { AuthorizationManager, SYMBOL_AUTHORIZATION_MANAGER } from './security/AuthorizationManager';
import { RouteToPageAction } from './actions/RouteToPageAction';
import { AbstractValidationRule, SYMBOL_VALIDATION_RULE } from './validation/AbstractValidationRule';
import { RequiredValidationRule } from './validation/RequiredValidationRule';
import { LengthBetweenValidationRule } from './validation/LengthBetweenValidationRule';


export function bindProviders(
    container: Container,
    
    /* Mechanism to override specific services */
    i18nLookupServiceType: new (...args: never[]) => AbstractI18nLookupService = DefaultI18nLookupService,
    routeToPageAction: new (...args: never[]) => AbstractAction = RouteToPageAction,
    routeToPageRedirectAwareAction: new (...args: never[]) => AbstractAction = RouteToPageRedirectAwareAction,
    routeToNextWizardStepAction: new (...args: never[]) => AbstractAction = RouteToNextWizardStepAction,
    routeToPrevWizardStepAction: new (...args: never[]) => AbstractAction = RouteToPrevWizardStepAction,
  ) {

  /* Data Providers */
  container.bind<DataProvider>(SYMBOL_DATA_PROVIDER).to(SampleDictionaryDataProvider);

  /* Services */
  container.bind<AbstractI18nLookupService>(SYMBOL_I18N_PROVIDER).to(i18nLookupServiceType);
  container.bind<ActionVariableEvaluationService>(SYMBOL_ACTION_VARIABLE_EVAL_SERVICE).to(ActionVariableEvaluationService);

  /* Handlers */
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(DebugStateAction);
  container.bind<AbstractValueChangeAction>(SYMBOL_VALUE_CHANGE_ACTION).to(DefaultValueChangeAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(FetchAction);

  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(FormSubmitAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(ExtractResponseDataAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(ExtractLocationDataAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(ExecuteScriptAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(ClickByRefAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(StoreDataAction);

  /* Actions to move between the pages */
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(routeToPageAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(routeToPageRedirectAwareAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(routeToNextWizardStepAction);
  container.bind<AbstractAction>(SYMBOL_ACTION_PROVIDER).to(routeToPrevWizardStepAction);

  /* Validation Rules */
  container.bind<AbstractValidationRule>(SYMBOL_VALIDATION_RULE).to(RequiredValidationRule);
  container.bind<AbstractValidationRule>(SYMBOL_VALIDATION_RULE).to(LengthBetweenValidationRule);

  bindSecurityProviders(container);
}

function bindSecurityProviders(container: Container) {

  /* Security */
  container.bind<AuthorizationManager>(SYMBOL_AUTHORIZATION_MANAGER).to(AuthorizationManager);

  // const isRefreshStrategyBound = container.isBound(SYMBOL_REFRESH_STRATEGY);
  // if (true !== isRefreshStrategyBound) {
  //   container.bind<AbstractSessionRefreshStrategy>(SYMBOL_REFRESH_STRATEGY).to(OAuth2SessionRefreshStrategy);
  // }    
}
