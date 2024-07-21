import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractAction, ActionExecutionContext } from './AbstractAction';
import { getUrlQueryParam } from '../utils';

const ARG_QUERY_PARAM = "param";
const ARG_SAVE_TO = "saveTo";

@injectable()
export class ExtractLocationDataAction extends AbstractAction {

  name = 'ExtractLocationData';

  getName() {
    return this.name;
  }

  async execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }> {

    const { args, dispatch } = context;

    const queryParam = args[ARG_QUERY_PARAM];
    const saveTo = args[ARG_SAVE_TO];

    if (!queryParam || !saveTo) {
      console.error(`${this.name} > ${ARG_QUERY_PARAM}/${ARG_SAVE_TO} argument not provided`);
      return { next: false, result: undefined };
    }

    const value = getUrlQueryParam(queryParam);
    await dispatch.app.changeCurrentPageState({ name: saveTo, value });

    return { next: true, result: undefined };
  }

  override getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [
      { name: ARG_QUERY_PARAM, type: "string", label: "Query Param" },
      { name: ARG_SAVE_TO, type: "string", label: "Save To" }
    ];
  };
}
