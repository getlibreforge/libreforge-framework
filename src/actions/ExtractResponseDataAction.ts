import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractAction, ActionExecutionContext } from './AbstractAction';

const ARG_ATTRIBUTE = "attr";

@injectable()
export class ExtractResponseDataAction extends AbstractAction {

  name = 'ExtractResponseData';

  getName() {
    return this.name;
  }

  async execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }> {

    const { args, dispatch, prevExecutionState } = context;
    console.warn(`${this.name} called`);

    const attribute = args[ARG_ATTRIBUTE];
    if (!attribute) {
      console.error(`ExtractResponseData > ${ARG_ATTRIBUTE} argument not provided`);
      return { next: false, result: undefined };
    }

    const value = prevExecutionState?.data[attribute];
    const metaTotalHeader = `x-meta-total-${attribute}`;
    const metadataTotal = prevExecutionState?.headers.get(metaTotalHeader);

    const changeValue = !!value ? { [attribute]: value }: {};
    const changeMetadata = !!metadataTotal ? { [`_meta_total_${attribute}`]: metadataTotal }: {};
    const changeValues = { ...changeValue, ...changeMetadata };

    await dispatch.app.changeCurrentPageStateBulk({ items: changeValues });

    return { next: true, result: undefined };
  }

  override getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [
      { name: ARG_ATTRIBUTE, type: "string", label: "Attribute" }
    ];
  };
}
