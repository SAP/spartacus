import { OnDestroy } from '@angular/core';
import { CdcReConsentEvent } from '@spartacus/cdc/root';
import { EventService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CdcReconsentDialogEventListener implements OnDestroy {
    protected eventService: EventService;
    protected launchDialogService: LaunchDialogService;
    protected subscription: Subscription;
    constructor(eventService: EventService, launchDialogService: LaunchDialogService);
    protected onReconsent(): void;
    protected openDialog(event: CdcReConsentEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcReconsentDialogEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcReconsentDialogEventListener>;
}
