import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractRedirectAwareAction } from './AbstractRedirectAwareAction';
import { ActionExecutionContext } from './AbstractAction';

const ARG_URL = "url";

@injectable()
export class RouteToPageRedirectAwareAction extends AbstractRedirectAwareAction {
  
  name = 'RouteToPageRedirectAware';

  getName() {
    return this.name;
  }

  async execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }> {

    const { args, dispatch, router } = context;
    const result = await super.execute(context);
    if (false === result.next) {
      return result;
    }

    console.warn(`${this.name} called`);

    const url = args[ARG_URL];
    if (!url) {
      console.error(`${this.name} > ${ARG_URL} argument not provided`);
      return { next: false, result: undefined };
    }

    console.log('Cleaning current page state');
    dispatch.app.setSharedErrorMessage({ message: undefined });
    dispatch.app.cleanCurrentPageState({})

    router(url);
    return { next: false, result: {} };
  }

  override getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [
      { name: ARG_URL, type: "string", label: "Url" }
    ];
  };  
}