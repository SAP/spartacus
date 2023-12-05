import { OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * Provides a UI to manage the count of the quantity, typically by using
 * increase and decrease functionality. The item counter expects an input `FormControl`
 * so that the state of the control can be managed outside of this component.
 */
export declare class ItemCounterComponent implements OnInit, OnDestroy {
    /**
     * Holds the value of the counter, the state of the `FormControl`
     * can be managed outside of the item counter.
     */
    control: UntypedFormControl;
    /**
     * This can be used in case an item has a minmum order quantity.
     * @default 1
     */
    min: number;
    /**
     * This can be used in case an item has a maximum order quantity.
     */
    max: number;
    /**
     * The step is used to increment the count. It is supposed to be a
     * positive integer or float.
     * @default 1
     */
    step: number;
    /**
     * Indicates that the input can be manually set to zero,
     * despite the fact that the input controls will be limited to
     * the minimum. The zero value can be used to remove an item.
     */
    allowZero: boolean;
    /**
     * In readonly mode the item counter will only be shown as a label,
     * the form controls are not rendered.
     * Please not that readonly is different from the `disabled` form state.
     * @default false
     */
    readonly: boolean;
    private input;
    /**
     * Subscription responsible for auto-correcting control's value when it's invalid.
     */
    private sub;
    handleClick(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    increment(): void;
    decrement(): void;
    /**
     * Validate that the given value is in between
     * the `min` and `max` value. If the value is out
     * of  the min/max range, it will be altered.
     * If `allowZero` is set to true, the 0 value is ignored.
     *
     */
    private getValidCount;
    static ɵfac: i0.ɵɵFactoryDeclaration<ItemCounterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ItemCounterComponent, "cx-item-counter", never, { "control": "control"; "min": "min"; "max": "max"; "step": "step"; "allowZero": "allowZero"; "readonly": "readonly"; }, {}, never, never, false, never>;
}
