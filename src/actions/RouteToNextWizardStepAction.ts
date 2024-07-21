import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractAction, ActionExecutionContext } from './AbstractAction';

const ARG_URL = "url";

@injectable()
export class RouteToNextWizardStepAction extends AbstractAction {

  name = 'RouteToNextWizardStep';

  getName() {
    return this.name;
  }

  async execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }> {

    const { args, dispatch, router } = context;

    const url = args[ARG_URL];
    if (!url) {
      console.error(`${this.name} > ${ARG_URL} argument not provided`);
      return { next: false, result: undefined };
    }

    dispatch.app.nextWizardStep({ });
    router(url);

    return { next: true, result: {} };
  }

  override getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [
      { name: ARG_URL, type: "string", label: "Url" }
    ];
  };  
}
