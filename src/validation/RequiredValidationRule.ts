import 'reflect-metadata';
import { injectable } from 'inversify';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import { AbstractValidationRule } from './AbstractValidationRule';

const ERROR_MESSAGE = "Field is required";

@injectable()
export class RequiredValidationRule extends AbstractValidationRule {  

  name = "Required";

  getName() {
    return this.name;
  }

  validate(componentId: string, args: any, pageComponents: IComponents, currentPageState: any): string | undefined {

    const component = pageComponents[componentId];
    const variable = component.props['_x_name'];  
    const value = currentPageState[variable];

    if (!value) {
      return ERROR_MESSAGE;
    } else {
      return undefined;
    }
  };

  /**
   * @returns action arguments definition
   */
  getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [];
  };  
}
