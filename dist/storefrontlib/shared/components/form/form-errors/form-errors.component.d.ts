import { ChangeDetectorRef, DoCheck, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Renders translated form errors for a given form control, based on its `errors` property.
 *
 * The translation key consists of the optional input `prefix`
 * concatenated with the error key.
 *
 * And the translation params object consist of the error details
 * (if only it's an object) merged with the optional input object `translationParams`.
 */
export declare class FormErrorsComponent implements DoCheck {
    protected ChangeDetectionRef: ChangeDetectorRef;
    protected keyValueDiffers: KeyValueDiffers;
    constructor(ChangeDetectionRef: ChangeDetectorRef, keyValueDiffers: KeyValueDiffers);
    _control: UntypedFormControl | AbstractControl;
    /**
     * Emits an array of errors, each represented by a tuple:
     * the error key and error details.
     */
    errorsDetails$: Observable<Array<[string, string | boolean]>>;
    protected differ: KeyValueDiffer<any, any>;
    /**
     * Prefix prepended to the translation key.
     */
    prefix: string;
    /**
     * Translation params to enrich the error details object.
     */
    translationParams: {
        [key: string]: string | null;
    };
    set control(control: AbstractControl | UntypedFormControl | null);
    get control(): UntypedFormControl | AbstractControl;
    ngDoCheck(): void;
    /**
     * Returns translation params composed of
     * the argument `errorDetails` (if only is an object) merged with
     * the component input object `translationParams`.
     *
     * In case of a conflicting object key, the value from
     * `translationParams` takes precedence.
     */
    getTranslationParams(errorDetails?: any): object;
    get invalid(): boolean;
    get dirty(): boolean;
    get touched(): boolean;
    get hidden(): boolean;
    role: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormErrorsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormErrorsComponent, "cx-form-errors", never, { "prefix": "prefix"; "translationParams": "translationParams"; "control": "control"; }, {}, never, never, false, never>;
}
