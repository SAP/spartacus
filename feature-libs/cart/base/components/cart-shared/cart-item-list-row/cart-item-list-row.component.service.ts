import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CartItemListComponentService {
    showBasePriceWithDiscount() { // rename as per your requirement
        return true;
    }
}
