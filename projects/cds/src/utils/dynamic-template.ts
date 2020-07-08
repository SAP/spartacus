export class DynamicTemplate {
  static resolve(templateString: string, templateVariables: Object) {
    for (const variableLabel of Object.keys(templateVariables)) {
      const placeholder = new RegExp('\\${' + variableLabel + '}', 'g');
      templateString = templateString.replace(
        placeholder,
        templateVariables[variableLabel]
      );
    }
    return templateString;
  }
}
