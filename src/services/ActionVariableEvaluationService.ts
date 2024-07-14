import { injectable } from "inversify";

export const SYMBOL_ACTION_VARIABLE_EVAL_SERVICE = 'ActionVariableEvaluationService';

@injectable()
export class ActionVariableEvaluationService {

    getValue(variable: string, lastActionResult: any, pageState: any) {
        return lastActionResult?.[variable] || pageState[variable];
    }
}