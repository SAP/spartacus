import { OnInit } from '@angular/core';
import { BulkPricingService } from '@spartacus/product/bulk-pricing/core';
import { RoutingService } from '@spartacus/core';
import { BulkPrice } from '@spartacus/product/bulk-pricing/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BulkPricingTableComponent implements OnInit {
    protected routingService: RoutingService;
    protected bulkPricingService: BulkPricingService;
    protected readonly PRODUCT_KEY = "productCode";
    priceTiers$: Observable<BulkPrice[] | undefined>;
    constructor(routingService: RoutingService, bulkPricingService: BulkPricingService);
    ngOnInit(): void;
    formatQuantity(tier: BulkPrice): string;
    getPrices(): Observable<BulkPrice[] | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BulkPricingTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BulkPricingTableComponent, "cx-bulk-pricing-table", never, {}, {}, never, never, false, never>;
}
