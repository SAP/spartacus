import { ElementRef, ViewContainerRef } from '@angular/core';
import { LaunchDialogService } from '../../../layout/launch-dialog/services/launch-dialog.service';
import * as i0 from "@angular/core";
export declare class AnonymousConsentOpenDialogComponent {
    protected vcr: ViewContainerRef;
    protected launchDialogService: LaunchDialogService;
    openElement: ElementRef;
    constructor(vcr: ViewContainerRef, launchDialogService: LaunchDialogService);
    openDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnonymousConsentOpenDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AnonymousConsentOpenDialogComponent, "cx-anonymous-consent-open-dialog", never, {}, {}, never, never, false, never>;
}
