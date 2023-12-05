import { MyAccountV2DownloadInvoicesEventListener } from './my-account-v2-download-invoices-event.listener';
import * as i0 from "@angular/core";
import * as i1 from "./my-account-v2-download-invoices.component";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@spartacus/core";
import * as i5 from "@spartacus/pdf-invoices/components";
export declare class MyAccountV2DownloadInvoicesModule {
    protected downloadInvoicesDialogEventListener: MyAccountV2DownloadInvoicesEventListener;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyAccountV2DownloadInvoicesModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MyAccountV2DownloadInvoicesModule, [typeof i1.MyAccountV2DownloadInvoicesComponent], [typeof i2.CommonModule, typeof i3.KeyboardFocusModule, typeof i3.IconModule, typeof i4.I18nModule, typeof i3.PaginationModule, typeof i3.SortingModule, typeof i3.SpinnerModule, typeof i5.PDFInvoicesComponentsModule], [typeof i1.MyAccountV2DownloadInvoicesComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MyAccountV2DownloadInvoicesModule>;
}
