/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { UntypedFormArray, UntypedFormGroup, } from '@angular/forms';
/**
 * Utils for Angular forms
 */
export var FormUtils;
(function (FormUtils) {
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
    function deepUpdateValueAndValidity(control, options = {}) {
        if (control instanceof UntypedFormGroup ||
            control instanceof UntypedFormArray) {
            Object.values(control.controls).forEach((childControl) => {
                deepUpdateValueAndValidity(childControl, options);
            });
        }
        control.updateValueAndValidity({
            onlySelf: true,
            emitEvent: options.emitEvent,
        });
    }
    FormUtils.deepUpdateValueAndValidity = deepUpdateValueAndValidity;
})(FormUtils || (FormUtils = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvdXRpbHMvZm9ybS11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUVMLGdCQUFnQixFQUNoQixnQkFBZ0IsR0FDakIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4Qjs7R0FFRztBQUNILE1BQU0sS0FBVyxTQUFTLENBcUN6QjtBQXJDRCxXQUFpQixTQUFTO0lBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILFNBQWdCLDBCQUEwQixDQUN4QyxPQUF3QixFQUN4QixVQUFtQyxFQUFFO1FBRXJDLElBQ0UsT0FBTyxZQUFZLGdCQUFnQjtZQUNuQyxPQUFPLFlBQVksZ0JBQWdCLEVBQ25DO1lBQ0EsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUNyQyxDQUFDLFlBQTZCLEVBQUUsRUFBRTtnQkFDaEMsMEJBQTBCLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3BELENBQUMsQ0FDRixDQUFDO1NBQ0g7UUFFRCxPQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7U0FDN0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQW5CZSxvQ0FBMEIsNkJBbUJ6QyxDQUFBO0FBQ0gsQ0FBQyxFQXJDZ0IsU0FBUyxLQUFULFNBQVMsUUFxQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQWJzdHJhY3RDb250cm9sLFxuICBVbnR5cGVkRm9ybUFycmF5LFxuICBVbnR5cGVkRm9ybUdyb3VwLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKlxuICogVXRpbHMgZm9yIEFuZ3VsYXIgZm9ybXNcbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBGb3JtVXRpbHMge1xuICAvKipcbiAgICogQ2FsbHMgdGhlIG5hdGl2ZSBBbmd1bGFyIG1ldGhvZCBgI3VwZGF0ZVZhbHVlQW5kVmFsaWRpdHlgIGZvciB0aGUgZ2l2ZW4gZnJvbSBjb250cm9sXG4gICAqIGFuZCBhbGwgaXRzIGRlc2NlbmRhbnRzIChpbiBjYXNlIHdoZW4gaXQncyBgRm9ybUdyb3VwYCBvciBgRm9ybUFycmF5YCkuXG4gICAqXG4gICAqIEluIHBhcnRpY3VsYXIgaXQncyB1c2VmdWwgZm9yIHRyaWdnZXJpbmcgcmUtZW1pc3Npb24gb2Ygb2JzZXJ2YWJsZXNcbiAgICogYHZhbHVlQ2hhbmdlc2AgYW5kIGBzdGF0dXNDaGFuZ2VzYCBmb3IgYWxsIGRlc2NlbmRhbnQgZm9ybSBjb250cm9scy5cbiAgICpcbiAgICogX05vdGU6IERyb3BwaW5nIHRoaXMgZnVuY3Rpb24gbWF5IGJlIGNvbnNpZGVyZWQsIHdoZW4gaXQncyBpbXBsZW1lbnRlZCBuYXRpdmVseVxuICAgKiBieSBBbmd1bGFyLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNjE3MF9cbiAgICpcbiAgICogQHBhcmFtIGNvbnRyb2wgZm9ybSBjb250cm9sXG4gICAqIEBwYXJhbSBvcHRpb25zIGFkZGl0aW9uYWwgb3B0aW9uc1xuICAgKiAqIGBlbWl0RXZlbnRgOiBXaGVuIHRydWUgb3Igbm90IGdpdmVuICh0aGUgZGVmYXVsdCksIHRoZSBgc3RhdHVzQ2hhbmdlc2AgYW5kXG4gICAqIGB2YWx1ZUNoYW5nZXNgIG9ic2VydmFibGVzIGVtaXQgdGhlIGxhdGVzdCBzdGF0dXMgYW5kIHZhbHVlLiBXaGVuIGZhbHNlLFxuICAgKiBpdCBkb2Vzbid0IHRyaWdnZXIgb2JzZXJ2YWJsZXMgZW1pc3Npb24uXG4gICAqL1xuICBleHBvcnQgZnVuY3Rpb24gZGVlcFVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoXG4gICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sLFxuICAgIG9wdGlvbnM6IHsgZW1pdEV2ZW50PzogYm9vbGVhbiB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgY29udHJvbCBpbnN0YW5jZW9mIFVudHlwZWRGb3JtR3JvdXAgfHxcbiAgICAgIGNvbnRyb2wgaW5zdGFuY2VvZiBVbnR5cGVkRm9ybUFycmF5XG4gICAgKSB7XG4gICAgICBPYmplY3QudmFsdWVzKGNvbnRyb2wuY29udHJvbHMpLmZvckVhY2goXG4gICAgICAgIChjaGlsZENvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xuICAgICAgICAgIGRlZXBVcGRhdGVWYWx1ZUFuZFZhbGlkaXR5KGNoaWxkQ29udHJvbCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtcbiAgICAgIG9ubHlTZWxmOiB0cnVlLCAvLyBhdm9pZCBjYWxsaW5nIGAjdXBkYXRlVmFsdWVBbmRWYWxpZGl0eWAgZm9yIGFsbCBhbmNlc3RvcnNcbiAgICAgIGVtaXRFdmVudDogb3B0aW9ucy5lbWl0RXZlbnQsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==