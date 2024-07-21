import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractAction, ActionExecutionContext } from './AbstractAction';

const STATE_TYPE_SHARED = "shared";
const ARG_STATE_TYPE = "stateType";

@injectable()
export class StoreDataAction extends AbstractAction {

  name = 'StoreDataAction';

  getName() {
    return this.name;
  }

  async execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }> {

    const { args, dispatch, prevExecutionState } = context;
    const prevExecutionData = prevExecutionState?.data || {};

    const stateType = args[ARG_STATE_TYPE];
    if (!stateType) {
      console.error(`DebugState > ${ARG_STATE_TYPE} argument not provided`);
      return { next: false, result: undefined };
    }

    const attributes = Object.keys(prevExecutionData);

    if (STATE_TYPE_SHARED === stateType) {
      for (let i=0; i < attributes.length; i++) {
        await dispatch.app.changeSharedState({ name: attributes[i], value: prevExecutionData[attributes[i]] });
      }

    } else {
      for (let i=0; i < attributes.length; i++) {
        await dispatch.app.changeCurrentPageState({ name: attributes[i], value: prevExecutionData[attributes[i]] });
      }
    }
    
    return { next: true, result: undefined };
  }

  override getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [
      { name: ARG_STATE_TYPE, type: "string", label: "State Type" }
    ];
  };
}
