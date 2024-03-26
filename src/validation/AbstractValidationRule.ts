import 'reflect-metadata';
import { injectable } from 'inversify';
import { IComponents } from '@libreforge/libreforge-framework-shared';

export const SYMBOL_VALIDATION_RULE = 'ValidationRule';

@injectable()
export abstract class AbstractValidationRule {

  abstract getName(): string;

  /** 
   * @returns object of { componentId -> message }
   */
  abstract validate(
    componentId: string,
    args: any,
    pageComponents: IComponents, 
    currentPageState: any,
  ): string | undefined;

  abstract getArgsDefinition(): { name: string; type: string; label: string }[];
}
