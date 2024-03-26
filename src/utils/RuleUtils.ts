import { AbstractValidationRule } from "../validation";

export const getArgsByRule = (rulePropName: string, rule: AbstractValidationRule, props: any): any => {
    if (!rule) {
        return {};
    }

    const targetArgs: any = {};
    const args = rule.getArgsDefinition();
    args.forEach(a => {
        targetArgs[a.name] = props[`${rulePropName}_${a.name}`];
    });

    return targetArgs;
}