import { isDevMode } from '@angular/core';

export class DynamicTemplate {
  static resolve(templateString: string, templateVariables: Object) {
    const keys = Object.keys(templateVariables);
    // Can't use Object.values as the compilation settings are to es2015 not es2017
    const values = keys.map(key => templateVariables[key]);

    const templateFunction = new Function(
      ...keys,
      `return \`${templateString}\`;`
    );

    try {
      return templateFunction(...values);
    } catch (e) {
      if (isDevMode() && e instanceof ReferenceError) {
        console.warn(
          `Could not build url. Key "${e.message.split(' ')[0]}" not found.`
        );
      }

      return templateString;
    }
  }
}
