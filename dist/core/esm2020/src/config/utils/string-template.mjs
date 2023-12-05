/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export class StringTemplate {
    /**
     * Populates the given template with the variables provided
     *
     * @param templateString template of the OCC endpoint
     * @param templateVariables variables to replace in the template
     * @param encodeVariable encode variable before placing it in the template
     */
    static resolve(templateString, templateVariables, encodeVariable) {
        for (const variableLabel of Object.keys(templateVariables)) {
            const placeholder = new RegExp('\\${' + variableLabel + '}', 'g');
            templateString = templateString.replace(placeholder, 
            // TODO 4.0: default to encodeVariable = true
            encodeVariable
                ? encodeURIComponent(templateVariables[variableLabel])
                : templateVariables[variableLabel]);
        }
        return templateString;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvY29uZmlnL3V0aWxzL3N0cmluZy10ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLGNBQWM7SUFDekI7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FDWixjQUFzQixFQUN0QixpQkFBeUIsRUFDekIsY0FBd0I7UUFFeEIsS0FBSyxNQUFNLGFBQWEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDMUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLGFBQWEsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbEUsY0FBYyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQ3JDLFdBQVc7WUFDWCw2Q0FBNkM7WUFDN0MsY0FBYztnQkFDWixDQUFDLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsYUFBNkIsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDLENBQUMsaUJBQWlCLENBQUMsYUFBNkIsQ0FBQyxDQUNyRCxDQUFDO1NBQ0g7UUFDRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgY2xhc3MgU3RyaW5nVGVtcGxhdGUge1xuICAvKipcbiAgICogUG9wdWxhdGVzIHRoZSBnaXZlbiB0ZW1wbGF0ZSB3aXRoIHRoZSB2YXJpYWJsZXMgcHJvdmlkZWRcbiAgICpcbiAgICogQHBhcmFtIHRlbXBsYXRlU3RyaW5nIHRlbXBsYXRlIG9mIHRoZSBPQ0MgZW5kcG9pbnRcbiAgICogQHBhcmFtIHRlbXBsYXRlVmFyaWFibGVzIHZhcmlhYmxlcyB0byByZXBsYWNlIGluIHRoZSB0ZW1wbGF0ZVxuICAgKiBAcGFyYW0gZW5jb2RlVmFyaWFibGUgZW5jb2RlIHZhcmlhYmxlIGJlZm9yZSBwbGFjaW5nIGl0IGluIHRoZSB0ZW1wbGF0ZVxuICAgKi9cbiAgc3RhdGljIHJlc29sdmUoXG4gICAgdGVtcGxhdGVTdHJpbmc6IHN0cmluZyxcbiAgICB0ZW1wbGF0ZVZhcmlhYmxlczogT2JqZWN0LFxuICAgIGVuY29kZVZhcmlhYmxlPzogYm9vbGVhblxuICApOiBzdHJpbmcge1xuICAgIGZvciAoY29uc3QgdmFyaWFibGVMYWJlbCBvZiBPYmplY3Qua2V5cyh0ZW1wbGF0ZVZhcmlhYmxlcykpIHtcbiAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gbmV3IFJlZ0V4cCgnXFxcXCR7JyArIHZhcmlhYmxlTGFiZWwgKyAnfScsICdnJyk7XG4gICAgICB0ZW1wbGF0ZVN0cmluZyA9IHRlbXBsYXRlU3RyaW5nLnJlcGxhY2UoXG4gICAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgICAvLyBUT0RPIDQuMDogZGVmYXVsdCB0byBlbmNvZGVWYXJpYWJsZSA9IHRydWVcbiAgICAgICAgZW5jb2RlVmFyaWFibGVcbiAgICAgICAgICA/IGVuY29kZVVSSUNvbXBvbmVudCh0ZW1wbGF0ZVZhcmlhYmxlc1t2YXJpYWJsZUxhYmVsIGFzIGtleW9mIG9iamVjdF0pXG4gICAgICAgICAgOiB0ZW1wbGF0ZVZhcmlhYmxlc1t2YXJpYWJsZUxhYmVsIGFzIGtleW9mIG9iamVjdF1cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0ZW1wbGF0ZVN0cmluZztcbiAgfVxufVxuIl19