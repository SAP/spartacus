import { OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { DownloadOrderInvoicesEvent } from '@spartacus/order/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MyAccountV2DownloadInvoicesEventListener implements OnDestroy {
    protected subscription: Subscription;
    protected eventService: EventService;
    protected launchDialogService: LaunchDialogService;
    constructor();
    protected onDownloadInvoices(): void;
    protected openDialog(event: DownloadOrderInvoicesEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyAccountV2DownloadInvoicesEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MyAccountV2DownloadInvoicesEventListener>;
}
