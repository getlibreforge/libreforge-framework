import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractAction, ActionExecutionContext } from './AbstractAction';

const STATE_TYPE_SHARED = "shared";
const ARG_STATE_TYPE = "stateType";

@injectable()
export class DebugStateAction extends AbstractAction {

  name = 'DebugState';

  getName() {
    return this.name;
  }

  async execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }> {

    const { args, sharedState, currentPageState } = context;

    const stateType = args[ARG_STATE_TYPE];
    if (!stateType) {
      console.error(`DebugState > ${ARG_STATE_TYPE} argument not provided`);
      return { next: false, result: undefined };
    }

    let state = undefined;
    if (STATE_TYPE_SHARED === stateType) {
      state = sharedState;
    } else {
      state = currentPageState;
    }

    alert(JSON.stringify(state));
    return { next: true, result: undefined };
  }

  override getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [
      { name: ARG_STATE_TYPE, type: "string", label: "State Type" }
    ];
  };  
}
