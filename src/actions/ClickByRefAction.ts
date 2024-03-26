import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractAction, ActionExecutionContext } from './AbstractAction';

export const ACTION_CLICK_BY_REF = "ClickByRef";
export const ARG_COMPONENT_REF_ID = "ref";

@injectable()
export class ClickByRefAction extends AbstractAction {  

  name = ACTION_CLICK_BY_REF;

  getName() {
    return this.name;
  }

  async execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }> {

    const { args, pageComponents } = context;

    console.warn(`${this.name} called`);

    const componentRef = args[ARG_COMPONENT_REF_ID];
    if (!componentRef) {
      console.error(`ClickByRef > ${ARG_COMPONENT_REF_ID} argument not provided`);
      return { next: false, result: undefined };
    }

    const targetComponentName = pageComponents[componentRef].props['_x_name'];

    const targetElement = document.querySelectorAll<HTMLButtonElement>(`button[_x_name='${targetComponentName}']`)[0];

    if (!!targetElement) {
      targetElement.click();
    } else {
      console.error(`ClickByRef -> Button ${componentRef} not found on page`);
      return { next: false, result: undefined };
    }

    return { next: true, result: undefined };
  }

  override getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [
      { name: ARG_COMPONENT_REF_ID, type: "string", label: "Reference" }
    ];
  };  
}
