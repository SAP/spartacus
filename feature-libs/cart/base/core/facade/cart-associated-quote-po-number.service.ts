import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CartAssociatedQuotePurchaseOrderNumberFacade } from "@spartacus/cart/base/root";

@Injectable()
export class CartAssociatedQuotePurchaseOrderNumberService implements CartAssociatedQuotePurchaseOrderNumberFacade {
    isPurchaseOrderNumberNonEditable(_: string): Observable<boolean> {
        return of(false);
    }
}