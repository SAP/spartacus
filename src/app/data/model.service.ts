import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ModelService {

    private subscriptions: Array<BehaviorSubject<any>> = [];

    store(key, data) {
        const subscription = this.get(key);
        if (!this.isEqual(subscription, data)) {
            subscription.next(data);
        }
    }

    get(key: string): BehaviorSubject<any> {
        if (!this.subscriptions[key]) {
            this.subscriptions[key] = new BehaviorSubject<any>(null);
        }
        return this.subscriptions[key];
    }

    private isEqual(subscription, model) {
        return JSON.stringify(subscription.getValue()) === JSON.stringify(model);
    }
    
}
