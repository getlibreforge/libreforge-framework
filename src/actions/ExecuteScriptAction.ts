import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractAction, ActionExecutionContext } from './AbstractAction';
import DynamicScriptExecutor from '../utils/DynamicScriptExecutor';

const ARG_QUERY_SCRIPT = "script";

@injectable()
export class ExecuteScriptAction extends AbstractAction {

  name = 'ExecuteScript';

  getName() {
    return this.name;
  }

  async execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }> {

    const { args, sharedState, currentPageState, dispatch, container } = context;
    console.warn(`${this.name} called`);

    const script = args[ARG_QUERY_SCRIPT];

    if (!script) {
      console.error(`${this.name} > ${ARG_QUERY_SCRIPT} argument not provided`);
      return { next: false, result: undefined };
    }

    new DynamicScriptExecutor().execute(script, dispatch, currentPageState, sharedState, container);
    return { next: true, result: undefined };
  }

  override getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [
      { name: ARG_QUERY_SCRIPT, type: "string", label: "Script" }
    ];
  };
}
