const REGEX_SINGLE_VARIABLE = /\$\{(.*)\}/g;

export function getExpressionVariableName(expression: string) {
  const matches = expression.matchAll(REGEX_SINGLE_VARIABLE);
  const match = matches.next();

  return !!match.value ? match.value?.[1]: undefined;
}

export function replaceVariable(text: string, variable: string, value: any) {  
  if (!!variable) {
    return text.replace(`\$\{${variable}\}`, !!value ? value: '')
  } else {
    return text;  
  }
}
