import { ElementRef } from '@angular/core';
import { OrderEntriesContext } from '@spartacus/cart/base/root';
import { ContextService, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ImportOrderEntriesComponent {
    protected launchDialogService: LaunchDialogService;
    protected contextService: ContextService;
    protected subscription: Subscription;
    element: ElementRef;
    constructor(launchDialogService: LaunchDialogService, contextService: ContextService);
    orderEntriesContext$: Observable<OrderEntriesContext | undefined>;
    openDialog(orderEntriesContext: OrderEntriesContext): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImportOrderEntriesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImportOrderEntriesComponent, "cx-import-order-entries", never, {}, {}, never, never, false, never>;
}
