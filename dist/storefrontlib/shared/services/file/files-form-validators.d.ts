import { ValidatorFn } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class FilesFormValidators {
    CONVERT_TO_MB: number;
    extenstionRegEx: RegExp;
    /**
     * Checks max size of file
     *
     * @param {number} maxSize Max size [MB]
     * @returns Uses 'tooLarge' validator error with maxSize property
     * @memberOf FilesFormValidators
     */
    maxSize(maxSize?: number): ValidatorFn;
    /**
     * Checks maximum entries
     *
     * @param {number} maxEntries Max number of entries
     * @returns Uses 'tooManyEntries' validator error with maxEntries property
     * @memberOf FilesFormValidators
     */
    maxEntries(maxEntries?: number): ValidatorFn;
    /**
     * Checks allowed types
     *
     * @param {Array<string>} allowedTypes Allowed types of files
     * @returns Uses 'notParsable' validator error with allowedTypes property
     * @memberOf FilesFormValidators
     */
    allowedTypes(allowedTypes?: Array<string>): ValidatorFn;
    protected getExtension(filename?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilesFormValidators, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FilesFormValidators>;
}
