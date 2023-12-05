import { EventEmitter, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PickupOption } from '@spartacus/pickup-in-store/root';
import * as i0 from "@angular/core";
/**
 * The presentational component of a pair of radio buttons for pickup options for a product.
 */
export declare class PickupOptionsComponent implements OnChanges {
    /** The selected option, either `'pickup'` or `'delivery'`. */
    selectedOption: PickupOption;
    /** The location to display in the pickup option. */
    displayPickupLocation: string | undefined;
    disableControls: boolean;
    /** Emitted when the selected option is changed. */
    pickupOptionChange: EventEmitter<PickupOption>;
    /** Emitted when a new store should be selected. */
    pickupLocationChange: EventEmitter<undefined>;
    pickupId: string;
    deliveryId: string;
    pickupOptionsForm: FormGroup<{
        pickupOption: FormControl<PickupOption | null>;
    }>;
    ngOnChanges(): void;
    /** Emit a new selected option. */
    onPickupOptionChange(option: PickupOption): void;
    /** Emit to indicate a new store should be selected. */
    onPickupLocationChange(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickupOptionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PickupOptionsComponent, "cx-pickup-options", never, { "selectedOption": "selectedOption"; "displayPickupLocation": "displayPickupLocation"; "disableControls": "disableControls"; }, { "pickupOptionChange": "pickupOptionChange"; "pickupLocationChange": "pickupLocationChange"; }, never, never, false, never>;
}
