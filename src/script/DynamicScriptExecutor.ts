import { ScriptContext } from "./ScriptContext";
import { Container } from 'inversify';
import { RematchDispatch } from '@rematch/core';

export default class DynamicScriptExecutor {

    public execute = (script: string, dispatch: RematchDispatch<any>, currentPageState: any,
            sharedState: any, container: Container, router: any, prevExecutionData: any) => {

        /**
         * _Example_
         * const value = await ctx.getValue("userId"); 
         * alert(value);
         */
        try {
            const ctx = new ScriptContext(dispatch, currentPageState, sharedState, container, router, prevExecutionData);
            const body = `async function( ctx ) { ${script} }`;
            const wrap = (s: string) => "{ return " + s + " };"
            const func = new Function( wrap(body) );
            return func.call( null ).call( null, ctx ); /* invoke the function using arguments */

        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}