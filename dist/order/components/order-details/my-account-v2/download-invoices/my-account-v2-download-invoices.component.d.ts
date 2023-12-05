import { ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { OrderOutlets } from '@spartacus/order/root';
import { InvoicesListComponent } from '@spartacus/pdf-invoices/components';
import { ICON_TYPE, FocusConfig, LaunchDialogService } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class MyAccountV2DownloadInvoicesComponent implements AfterViewChecked {
    invoiceComponent: InvoicesListComponent;
    readonly OrderOutlets: typeof OrderOutlets;
    invoiceCount: number | undefined;
    iconTypes: typeof ICON_TYPE;
    focusConfig: FocusConfig;
    protected launchDialogService: LaunchDialogService;
    protected cdr: ChangeDetectorRef;
    ngAfterViewChecked(): void;
    close(reason?: any, _message?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyAccountV2DownloadInvoicesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MyAccountV2DownloadInvoicesComponent, "cx-my-account-v2-download-invoices", never, {}, {}, never, never, false, never>;
}
