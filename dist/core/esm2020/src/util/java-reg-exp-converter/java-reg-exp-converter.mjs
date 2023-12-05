/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject, isDevMode } from '@angular/core';
import { LoggerService } from '../../logger';
import * as i0 from "@angular/core";
export class JavaRegExpConverter {
    constructor() {
        this.logger = inject(LoggerService);
        /**
         * Pattern that extracts modifiers from the Java regexp.
         *
         * Java regexps MAY start with ONE or MANY modifiers like `(?MODIFIERS)PATTERN`. Examples:
         * - `(?i)` for Case Insensitive Mode: `(?i)PATTERN`
         * - `(?u)` for Unicode-Aware Case Folding; `(?u)PATTERN`
         * - or multiple combined:  `(?iu)PATTERN`
         * - (more modifiers in the official Java docs https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)
         *
         * This pattern extracts 3 parts from the input string, i.e. for `(?iu)PATTERN`:
         *    1. original modifiers syntax, i.e. `(?iu)` (or undefined if no modifiers present)
         *    2. extracted modifiers, i.e. `iu` (or undefined if no modifiers present)
         *    3. the rest of the regexp, i.e. `PATTERN`
         */
        this.EXTRACT_JAVA_REGEXP_MODIFIERS = /^(\(\?([a-z]+)\))?(.*)/;
    }
    /**
     * Converts RegExp from Java syntax to Javascript, by recognizing Java regexp modifiers
     * and converting them to the Javascript ones (i.e. case insensitive mode: `(?i)PATTERN` -> `/pattern/i`)
     *
     * **CAUTION!** Not all features and modifiers of Java regexps are valid in Javascript!
     * If unsupported feature or modifier is used, then `null` will be returned instead of Javascript RegExp.
     *
     * See differences between Java and Javascript regexps:
     * - https://stackoverflow.com/questions/8754444/convert-javascript-regular-expression-to-java-syntax
     * - https://en.wikipedia.org/wiki/Comparison_of_regular_expression_engines#Language_features
     */
    toJsRegExp(javaSyntax) {
        const parts = javaSyntax.match(this.EXTRACT_JAVA_REGEXP_MODIFIERS);
        if (!parts) {
            return null;
        }
        const [, , modifiers, jsSyntax] = parts;
        try {
            return new RegExp(jsSyntax, modifiers);
        }
        catch (error) {
            if (isDevMode()) {
                this.logger.warn(`WARNING: Could not convert Java regexp into Javascript. Original regexp: ${javaSyntax} \nMessage: ${error}`);
            }
            return null;
        }
    }
}
JavaRegExpConverter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JavaRegExpConverter, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
JavaRegExpConverter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JavaRegExpConverter, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JavaRegExpConverter, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YS1yZWctZXhwLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3V0aWwvamF2YS1yZWctZXhwLWNvbnZlcnRlci9qYXZhLXJlZy1leHAtY29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFHN0MsTUFBTSxPQUFPLG1CQUFtQjtJQURoQztRQUVFLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFL0I7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNjLGtDQUE2QixHQUM1Qyx3QkFBd0IsQ0FBQztLQThCNUI7SUE1QkM7Ozs7Ozs7Ozs7T0FVRztJQUNILFVBQVUsQ0FBQyxVQUFrQjtRQUMzQixNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsTUFBTSxDQUFDLEVBQUUsQUFBRCxFQUFHLFNBQVMsRUFBRSxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDeEMsSUFBSTtZQUNGLE9BQU8sSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3hDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLFNBQVMsRUFBRSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNkLDRFQUE0RSxVQUFVLGVBQWUsS0FBSyxFQUFFLENBQzdHLENBQUM7YUFDSDtZQUNELE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDOztnSEEvQ1UsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FETixNQUFNOzJGQUNuQixtQkFBbUI7a0JBRC9CLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0LCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sb2dnZXInO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEphdmFSZWdFeHBDb252ZXJ0ZXIge1xuICBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgLyoqXG4gICAqIFBhdHRlcm4gdGhhdCBleHRyYWN0cyBtb2RpZmllcnMgZnJvbSB0aGUgSmF2YSByZWdleHAuXG4gICAqXG4gICAqIEphdmEgcmVnZXhwcyBNQVkgc3RhcnQgd2l0aCBPTkUgb3IgTUFOWSBtb2RpZmllcnMgbGlrZSBgKD9NT0RJRklFUlMpUEFUVEVSTmAuIEV4YW1wbGVzOlxuICAgKiAtIGAoP2kpYCBmb3IgQ2FzZSBJbnNlbnNpdGl2ZSBNb2RlOiBgKD9pKVBBVFRFUk5gXG4gICAqIC0gYCg/dSlgIGZvciBVbmljb2RlLUF3YXJlIENhc2UgRm9sZGluZzsgYCg/dSlQQVRURVJOYFxuICAgKiAtIG9yIG11bHRpcGxlIGNvbWJpbmVkOiAgYCg/aXUpUEFUVEVSTmBcbiAgICogLSAobW9yZSBtb2RpZmllcnMgaW4gdGhlIG9mZmljaWFsIEphdmEgZG9jcyBodHRwczovL2RvY3Mub3JhY2xlLmNvbS9qYXZhc2UvOC9kb2NzL2FwaS9qYXZhL3V0aWwvcmVnZXgvUGF0dGVybi5odG1sKVxuICAgKlxuICAgKiBUaGlzIHBhdHRlcm4gZXh0cmFjdHMgMyBwYXJ0cyBmcm9tIHRoZSBpbnB1dCBzdHJpbmcsIGkuZS4gZm9yIGAoP2l1KVBBVFRFUk5gOlxuICAgKiAgICAxLiBvcmlnaW5hbCBtb2RpZmllcnMgc3ludGF4LCBpLmUuIGAoP2l1KWAgKG9yIHVuZGVmaW5lZCBpZiBubyBtb2RpZmllcnMgcHJlc2VudClcbiAgICogICAgMi4gZXh0cmFjdGVkIG1vZGlmaWVycywgaS5lLiBgaXVgIChvciB1bmRlZmluZWQgaWYgbm8gbW9kaWZpZXJzIHByZXNlbnQpXG4gICAqICAgIDMuIHRoZSByZXN0IG9mIHRoZSByZWdleHAsIGkuZS4gYFBBVFRFUk5gXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IEVYVFJBQ1RfSkFWQV9SRUdFWFBfTU9ESUZJRVJTOiBSZWdFeHAgPVxuICAgIC9eKFxcKFxcPyhbYS16XSspXFwpKT8oLiopLztcblxuICAvKipcbiAgICogQ29udmVydHMgUmVnRXhwIGZyb20gSmF2YSBzeW50YXggdG8gSmF2YXNjcmlwdCwgYnkgcmVjb2duaXppbmcgSmF2YSByZWdleHAgbW9kaWZpZXJzXG4gICAqIGFuZCBjb252ZXJ0aW5nIHRoZW0gdG8gdGhlIEphdmFzY3JpcHQgb25lcyAoaS5lLiBjYXNlIGluc2Vuc2l0aXZlIG1vZGU6IGAoP2kpUEFUVEVSTmAgLT4gYC9wYXR0ZXJuL2lgKVxuICAgKlxuICAgKiAqKkNBVVRJT04hKiogTm90IGFsbCBmZWF0dXJlcyBhbmQgbW9kaWZpZXJzIG9mIEphdmEgcmVnZXhwcyBhcmUgdmFsaWQgaW4gSmF2YXNjcmlwdCFcbiAgICogSWYgdW5zdXBwb3J0ZWQgZmVhdHVyZSBvciBtb2RpZmllciBpcyB1c2VkLCB0aGVuIGBudWxsYCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2YgSmF2YXNjcmlwdCBSZWdFeHAuXG4gICAqXG4gICAqIFNlZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIEphdmEgYW5kIEphdmFzY3JpcHQgcmVnZXhwczpcbiAgICogLSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84NzU0NDQ0L2NvbnZlcnQtamF2YXNjcmlwdC1yZWd1bGFyLWV4cHJlc3Npb24tdG8tamF2YS1zeW50YXhcbiAgICogLSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Db21wYXJpc29uX29mX3JlZ3VsYXJfZXhwcmVzc2lvbl9lbmdpbmVzI0xhbmd1YWdlX2ZlYXR1cmVzXG4gICAqL1xuICB0b0pzUmVnRXhwKGphdmFTeW50YXg6IHN0cmluZyk6IFJlZ0V4cCB8IG51bGwge1xuICAgIGNvbnN0IHBhcnRzID0gamF2YVN5bnRheC5tYXRjaCh0aGlzLkVYVFJBQ1RfSkFWQV9SRUdFWFBfTU9ESUZJRVJTKTtcbiAgICBpZiAoIXBhcnRzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgWywgLCBtb2RpZmllcnMsIGpzU3ludGF4XSA9IHBhcnRzO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cChqc1N5bnRheCwgbW9kaWZpZXJzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgICAgYFdBUk5JTkc6IENvdWxkIG5vdCBjb252ZXJ0IEphdmEgcmVnZXhwIGludG8gSmF2YXNjcmlwdC4gT3JpZ2luYWwgcmVnZXhwOiAke2phdmFTeW50YXh9IFxcbk1lc3NhZ2U6ICR7ZXJyb3J9YFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=