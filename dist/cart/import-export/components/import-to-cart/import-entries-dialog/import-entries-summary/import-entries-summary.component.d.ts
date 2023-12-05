import { EventEmitter } from '@angular/core';
import { OrderEntriesSource, ProductImportSummary } from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class ImportEntriesSummaryComponent {
    iconTypes: typeof ICON_TYPE;
    orderEntriesSource: typeof OrderEntriesSource;
    warningDetailsOpened: boolean;
    errorDetailsOpened: boolean;
    type: string;
    summary: ProductImportSummary;
    closeEvent: EventEmitter<string>;
    close(reason: string): void;
    toggleWarningList(): void;
    toggleErrorList(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImportEntriesSummaryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImportEntriesSummaryComponent, "cx-import-entries-summary", never, { "type": "type"; "summary": "summary"; }, { "closeEvent": "closeEvent"; }, never, never, false, never>;
}
