import { ActionExecutionContext } from "../actions";
import { ActionVariableEvaluationService } from "../services";

const REGEX_SINGLE_VARIABLE = /\$\{([a-zA-Z_$]*)\}/g;

export function getExpressionVariableNames(expression: string): string[] {
  const matches = expression.matchAll(REGEX_SINGLE_VARIABLE);
  const result = [];

  let match = undefined;
  do {
    match = matches.next()
    if (!!match && !!match.value) {
      result.push(match.value[1])
    }
  } while (!!match && !!match.value);

  return result; 
}

export function replaceVariable(text: string, variables: string[], context: ActionExecutionContext) {  

  const varsToEval = variables || [];
  let result = text;

  for (let i=0; i<varsToEval.length; i++) {
    const variable = varsToEval[i];
    const value = context.variableEvalService.getValue(variable, context.prevExecutionState?.data, context.currentPageState);

    result = result.replace(`\$\{${variable}\}`, !!value ? value: '');
  }

  return result;
}
