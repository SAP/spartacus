import { OrderEntriesContext, OrderEntry } from '@spartacus/cart/base/root';
import { ContextService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ExportOrderEntriesToCsvService } from './export-order-entries-to-csv.service';
import * as i0 from "@angular/core";
export declare class ExportOrderEntriesComponent {
    protected exportEntriesService: ExportOrderEntriesToCsvService;
    protected contextService: ContextService;
    styles: string;
    constructor(exportEntriesService: ExportOrderEntriesToCsvService, contextService: ContextService);
    protected orderEntriesContext$: Observable<OrderEntriesContext | undefined>;
    entries$: Observable<OrderEntry[] | undefined>;
    exportCsv(entries: OrderEntry[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExportOrderEntriesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExportOrderEntriesComponent, "cx-export-order-entries", never, {}, {}, never, never, false, never>;
}
