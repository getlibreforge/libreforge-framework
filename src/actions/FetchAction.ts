import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractAction, ActionExecutionContext } from './AbstractAction';
import FormSubmitService from '../services/FormSubmitService';
import { getExpressionVariableNames, replaceVariable } from '../utils';

const ARG_URL = "url";

@injectable()
export class FetchAction extends AbstractAction {

  name = 'Fetch';

  getName() {
    return this.name;
  }

  async execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }> {

    const { args, dispatch } = context;
    console.warn(`${this.name} called`);

    const rawUrl = args[ARG_URL];
    if (!rawUrl) {
      console.error(`Fetch > ${ARG_URL} argument not provided`);
      return { next: false, result: undefined };
    }

    const rawUrlVariables = getExpressionVariableNames(rawUrl);
    const targetUrl = replaceVariable(rawUrl, rawUrlVariables, context);

    /* Submitting */
    const response = await FormSubmitService.load("", targetUrl);
    const data = await response.json();

    return { next: true, result: { data, headers: undefined} };
  }

  override getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [
      { name: ARG_URL, type: "string", label: "Url" }
    ];
  };  
}
