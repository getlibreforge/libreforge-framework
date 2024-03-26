import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractAction, ActionExecutionContext } from './AbstractAction';
import FormSubmitService from '../services/FormSubmitService';

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

    const url = args[ARG_URL];
    if (!url) {
      console.error(`Fetch > ${ARG_URL} argument not provided`);
      return { next: false, result: undefined };
    }

    /* Submitting */
    const response = await FormSubmitService.load("", url);
    const data = await response.json();

    const keys = Object.keys(data);
    for (let i=0; i < keys.length; i++) {
      await dispatch.app.changeCurrentPageState({ name: keys[i], value: data[keys[i]] });
    }

    return { next: true, result: undefined };
  }

  override getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [
      { name: ARG_URL, type: "string", label: "Url" }
    ];
  };  
}
