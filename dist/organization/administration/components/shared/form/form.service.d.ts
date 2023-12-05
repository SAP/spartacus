import { UntypedFormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare abstract class FormService<T> {
    protected form: UntypedFormGroup | null;
    /**
     * Builds the form structure.
     */
    protected abstract build(item?: T): void;
    getForm(item?: T): UntypedFormGroup | null;
    protected patchData(item?: T): void;
    private toggleFreeze;
    /**
     * returns the default form value.
     */
    protected get defaultValue(): T;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormService<any>>;
}
