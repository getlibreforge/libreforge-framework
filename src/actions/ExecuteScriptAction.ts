import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractAction, ActionExecutionContext } from './AbstractAction';
import DynamicScriptExecutor from '../script/DynamicScriptExecutor';

const ARG_QUERY_SCRIPT = "script";

@injectable()
export class ExecuteScriptAction extends AbstractAction {

  name = 'ExecuteScript';

  getName() {
    return this.name;
  }

  async execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }> {

    const { args, sharedState, currentPageState, dispatch, container, router, prevExecutionState } = context;
    const prevExecutionData = prevExecutionState?.data || {};

    const script = args[ARG_QUERY_SCRIPT];
    if (!script) {
      console.error(`${this.name} > ${ARG_QUERY_SCRIPT} argument not provided`);
      return { next: false, result: undefined };
    }

    const data = await new DynamicScriptExecutor().execute(script, dispatch, currentPageState, sharedState, container, router, prevExecutionData);
    return { next: true, result: { data, headers: undefined} };
  }

  override getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [
      { name: ARG_QUERY_SCRIPT, type: "string", label: "Script" }
    ];
  };
}
