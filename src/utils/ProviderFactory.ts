import { Container } from 'inversify';
import {
  ComponentProvider,
  SYMBOL_COMPONENT_PROVIDER,
} from '../ComponentProvider';
import { DataProvider, SYMBOL_DATA_PROVIDER } from '../providers/DataProvider';
import {
  AbstractAction,
  SYMBOL_ACTION_PROVIDER,
} from '../actions/AbstractAction';
import { SYMBOL_VALUE_CHANGE_ACTION, AbstractValueChangeAction } from '../actions/AbstractValueChangeAction';
import { AbstractValidationRule, SYMBOL_VALIDATION_RULE } from '../validation';

export class ProviderFactory {
  container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  getByComponentType<T>(type: string): T {
    const providers = this.container.getAll<ComponentProvider>(
      SYMBOL_COMPONENT_PROVIDER,
    );
    return providers.filter((p) => p.getName() === type)[0] as T;
  }

  getByDataProviderType<T>(type: string): T[] {
    const providers = this.container.getAll<DataProvider>(SYMBOL_DATA_PROVIDER);
    return providers.filter((p) => p.getType() === type).map((p) => p as T);
  }

  getActionHandlerNames(): string[] {
    return this.getActionHandlers().map((h) => h.getName());
  }

  getActionHandlerByName(name: string): AbstractAction | undefined {
    const handlers = this.getActionHandlers().filter(
      (h) => h.getName() === name,
    );
    return handlers.length > 0 ? handlers[0] : undefined;
  }

  getValueChangeHandlerByName(name: string): AbstractValueChangeAction | undefined {
    const handlers = this.getValueChangeHandlers().filter(
      (h) => h.getName() === name,
    );
    return handlers.length > 0 ? handlers[0] : undefined;
  }

  getActionHandlers(): AbstractAction[] {
    return this.container.getAll<AbstractAction>(SYMBOL_ACTION_PROVIDER);
  }

  getValueChangeHandlers(): AbstractValueChangeAction[] {
    return this.container.getAll<AbstractValueChangeAction>(
      SYMBOL_VALUE_CHANGE_ACTION,
    );
  }

  getValidationRules(): AbstractValidationRule[] {
    return this.container.getAll<AbstractValidationRule>(SYMBOL_VALIDATION_RULE);
  } 
  
  getValidationRuleByName(name: string): AbstractValidationRule | undefined {
    const rules = this.getValidationRules().filter(
      (h) => h.getName() === name,
    );
    return rules.length > 0 ? rules[0] : undefined;
  }  
}
