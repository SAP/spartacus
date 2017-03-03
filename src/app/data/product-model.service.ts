import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductModelService {

    // private models: any = {};
    private subscriptions: Array<BehaviorSubject<any>> = [];

    storeProduct(productData) {
        const subscription = this.getSubscription(productData.code);

        if (!subscription.getValue()) {
            subscription.next(productData);
        }
    }

    getSubscription(key: string): BehaviorSubject<any> {
        if (!this.subscriptions[key]) {
            this.subscriptions[key] = new BehaviorSubject<any>(null);
        }
        return this.subscriptions[key];
    }
}
