import { isDevMode } from '@angular/core';

export class DynamicTemplate {
  static resolve(templateString: string, templateVariables: Object) {
    const results = templateString.match(/\${(.*?)}/g);
    let query = templateString;

    // If the templateString is has no "placeholders" or templateVariables is empty
    if (
      Boolean(results) &&
      Boolean(templateVariables) &&
      Object.keys(templateVariables).length > 0
    ) {
      for (const result of results) {
        let value: string;
        // Return the value for the key in the template, second one in the array to get the content of the curly brackets
        value = templateVariables[result.match(/{(.*)}/).pop()];

        // If one of the placeholders is not result return the string as provided
        if (value === null || value === undefined) {
          if (isDevMode()) {
            console.warn('Value for key "key" not found.');
          }
          return templateString;
        }
        query = query.replace(result, value);
      }
    }
    return query;
  }
}
