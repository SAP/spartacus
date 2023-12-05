import { ElementRef, ViewContainerRef } from '@angular/core';
import { LaunchDialogService } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class CloseAccountComponent {
    protected launchDialogService: LaunchDialogService;
    protected vcr: ViewContainerRef;
    element: ElementRef;
    constructor(launchDialogService: LaunchDialogService, vcr: ViewContainerRef);
    openModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CloseAccountComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CloseAccountComponent, "cx-close-account", never, {}, {}, never, never, false, never>;
}
