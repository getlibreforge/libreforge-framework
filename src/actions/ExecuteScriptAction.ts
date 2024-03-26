import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractAction, ActionExecutionContext } from './AbstractAction';
import { ScriptContext } from '../utils/ScriptContext';

const ARG_QUERY_SCRIPT = "script";

@injectable()
export class ExecuteScriptAction extends AbstractAction {

  name = 'ExecuteScript';

  getName() {
    return this.name;
  }

  async execute(context: ActionExecutionContext): Promise<{ next: boolean, result: any }> {

    const { args, sharedState, currentPageState, dispatch, container } = context;
    console.warn(`${this.name} called`);

    const script = args[ARG_QUERY_SCRIPT];

    if (!script) {
      console.error(`${this.name} > ${ARG_QUERY_SCRIPT} argument not provided`);
      return { next: false, result: undefined };
    }

    /**
     * _Example_
     * const value = await ctx.getValue("userId"); 
     * alert(value);
     */
    try {
      const ctx = new ScriptContext(dispatch, currentPageState, sharedState, container);
      const body = `async function( ctx ) { ${script} }`;
      const wrap = (s: string) => "{ return " + s + " };"
      const func = new Function( wrap(body) );
      func.call( null ).call( null, ctx ); /* invoke the function using arguments */

    } catch (error) {
      console.error(error);
    }

    return { next: true, result: undefined };
  }

  override getArgsDefinition(): { name: string; type: string; label: string }[] {
    return [
      { name: ARG_QUERY_SCRIPT, type: "string", label: "Script" }
    ];
  };
}
