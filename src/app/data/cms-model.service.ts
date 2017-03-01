import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { AsyncSubject } from 'rxjs/AsyncSubject';

@Injectable()
export class CmsModelService {
    
    private models: any = {};
    private subscriptions: Array<BehaviorSubject<any>> = [];

    getSubscription(key: string): BehaviorSubject<any> {
        // console.log('getSubscription', key);
        if (!this.subscriptions[key]) {
            this.subscriptions[key] = new BehaviorSubject<any>(null);
        }
        return this.subscriptions[key];
    }

    storeSlot(key, model) {

        if (this.isCached(key) && this.isEqual(key, model)) {
            return;
        }
        this.models[key] = model;
        
        const subscription = this.getSubscription(key);
        subscription.next(model);
    }

    storeComponent(key, model) {
        if (this.isCached(key)) {
            return;
        }
        this.models[key] = model;
        const subscription = this.getSubscription(key);
        subscription.next(model);
        // subscription.complete();
    }

    // is this necessary? we have it stored in the subscription...
    private isCached(key) {
        return this.models.hasOwnProperty(key);
    }

    private isEqual(key, model) {
        return JSON.stringify(this.models[key]) === JSON.stringify(model);
    }

}
