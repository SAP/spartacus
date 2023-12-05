import { ElementRef, OnInit } from '@angular/core';
import { Address } from '@spartacus/core';
import { FocusConfig, LaunchDialogService } from '../../../../../layout';
import { ICON_TYPE } from '../../../../misc/icon/index';
import * as i0 from "@angular/core";
export declare class SuggestedAddressDialogComponent implements OnInit {
    protected launchDialogService: LaunchDialogService;
    protected el: ElementRef;
    iconTypes: typeof ICON_TYPE;
    focusConfig: FocusConfig;
    selectedAddress: Address;
    data$: import("rxjs").Observable<any>;
    handleClick(event: UIEvent): void;
    constructor(launchDialogService: LaunchDialogService, el: ElementRef);
    ngOnInit(): void;
    closeModal(reason?: any): void;
    setSelectedAddress(data: {
        suggestedAddresses: Address[];
        enteredAddress: Address;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SuggestedAddressDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SuggestedAddressDialogComponent, "cx-suggested-addresses-dialog", never, {}, {}, never, never, false, never>;
}
