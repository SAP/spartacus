import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductModelService {

    // private models: any = {};
    private subscriptions: Array<BehaviorSubject<any>> = [];

    storeProduct(key, data) {
        
        const subscription = this.getSubscription(key);

        if (!subscription.getValue()) {
            subscription.next(data);
        }
    }

    getSubscription(key: string): BehaviorSubject<any> {
        if (!this.subscriptions[key]) {
            this.subscriptions[key] = new BehaviorSubject<any>(null);
        }
        return this.subscriptions[key];
    }
}
