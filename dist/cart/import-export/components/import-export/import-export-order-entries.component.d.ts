import { OrderEntriesContext } from '@spartacus/cart/base/root';
import { ContextService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ImportExportOrderEntriesComponent {
    protected contextService: ContextService;
    constructor(contextService: ContextService);
    protected context$: Observable<OrderEntriesContext | undefined>;
    shouldDisplayImport$: Observable<boolean>;
    shouldDisplayExport$: Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImportExportOrderEntriesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImportExportOrderEntriesComponent, "cx-import-export-order-entries", never, {}, {}, never, never, false, never>;
}
