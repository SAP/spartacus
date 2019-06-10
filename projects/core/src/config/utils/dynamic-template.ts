export class DynamicTemplate {
  static resolve(templateString: string, templateVariables: Object) {
    const keys = Object.keys(templateVariables);
    // Can't use Object.values as the compilation settings are to es2015 not es2017
    const values = keys.map(key => templateVariables[key]);

    const templateFunction = new Function(
      ...keys,
      `return \`${templateString}\`;`
    );
    return templateFunction(...values);
  }
}
