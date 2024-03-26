import 'reflect-metadata';
import { injectable } from 'inversify';
import { IComponents } from '@libreforge/libreforge-framework-shared';
import { AbstractValidationRule } from './AbstractValidationRule';

const ERROR_MESSAGE = "Length must be between {min} - {max}";

@injectable()
export class LengthBetweenValidationRule extends AbstractValidationRule {  

  name = "LengthBetween";

  getName() {
    return this.name;
  }

  validate(componentId: string, args: any, pageComponents: IComponents, currentPageState: any): string | undefined {

    const min = args?.['min'] || 0;
    const max = args?.['max'] || Number.MAX_SAFE_INTEGER;

    const component = pageComponents[componentId];
    const variable = component.props['_x_name'];  
    const value = currentPageState[variable];

    if (!value || value.length < min || value.length > max) {
      return ERROR_MESSAGE
              .replace('{min}', min)
              .replace('{max}', max === Number.MAX_SAFE_INTEGER ? 'indefinite': max);
    } else {
      return undefined;
    }
  };

  /**
   * @returns action arguments definition
   */
  getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [
      { name: 'min', type: 'string', label: 'Min' },
      { name: 'max', type: 'string', label: 'Max' }
    ];
  };  
}
