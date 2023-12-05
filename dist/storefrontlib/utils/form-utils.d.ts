import { AbstractControl } from '@angular/forms';
/**
 * Utils for Angular forms
 */
export declare namespace FormUtils {
    /**
     * Calls the native Angular method `#updateValueAndValidity` for the given from control
     * and all its descendants (in case when it's `FormGroup` or `FormArray`).
     *
     * In particular it's useful for triggering re-emission of observables
     * `valueChanges` and `statusChanges` for all descendant form controls.
     *
     * _Note: Dropping this function may be considered, when it's implemented natively
     * by Angular. See https://github.com/angular/angular/issues/6170_
     *
     * @param control form control
     * @param options additional options
     * * `emitEvent`: When true or not given (the default), the `statusChanges` and
     * `valueChanges` observables emit the latest status and value. When false,
     * it doesn't trigger observables emission.
     */
    function deepUpdateValueAndValidity(control: AbstractControl, options?: {
        emitEvent?: boolean;
    }): void;
}
