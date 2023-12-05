import { AddOrderEntriesContext, ProductData, ProductImportInfo, ProductImportSummary } from '@spartacus/cart/base/root';
import { FocusConfig, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ImportEntriesDialogComponent {
    protected launchDialogService: LaunchDialogService;
    iconTypes: typeof ICON_TYPE;
    focusConfig: FocusConfig;
    formState: boolean;
    summary$: BehaviorSubject<ProductImportSummary>;
    context$: Observable<AddOrderEntriesContext>;
    constructor(launchDialogService: LaunchDialogService);
    isNewCartForm(context: AddOrderEntriesContext): boolean;
    close(reason: string): void;
    importProducts(context: AddOrderEntriesContext, { products, savedCartInfo, }: {
        products: ProductData[];
        savedCartInfo?: {
            name: string;
            description: string;
        };
    }): void;
    protected populateSummary(action: ProductImportInfo): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImportEntriesDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImportEntriesDialogComponent, "cx-import-entries-dialog", never, {}, {}, never, never, false, never>;
}
