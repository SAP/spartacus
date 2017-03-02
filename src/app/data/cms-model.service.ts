import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


/**
 * This service currently contains logic and (cached) component and slot models
 */
@Injectable()
export class CmsModelService {

    private models: any = {};
    private subscriptions: Array<BehaviorSubject<any>> = [];

    // holds a reference to the existing slots, so that we can clear them
    private activeSlots = {
        template: {},
        page: {}
    };

    getSubscription(key: string): BehaviorSubject<any> {
        // console.log('getSubscription', key);
        if (!this.subscriptions[key]) {
            this.subscriptions[key] = new BehaviorSubject<any>(null);
        }
        return this.subscriptions[key];
    }

    // clear existing slot in case it was loaded previously with components
    // this happens during navigation from one page to another.
    clearSlot(key) {
        const subscription = this.getSubscription(key);
        subscription.next(null);
    }

    storeSlot(key, model) {
        // if (this.isCached(key) && this.isEqual(key, model)) {
        //     return;
        // }
        this.models[key] = model;

        const subscription = this.getSubscription(key);
        subscription.next(model);
    }

    /**
     * @desc stores all components from the list if they haven't been stored before.
     * @param components list of components
     */
    storeComponents(components: Array<any>) {
        if (components) {
            for (const component of components) {
                this.storeComponent(component.uid, component);
            }
        }
    }

    /**
     * @desc
     * Aggregates the components per slots and updates the slot accordingly
     * Active slots will be cleared.
     * @param components
     * @param {number} componentType template or page...
     */
    updateSlots(components: Array<any>, isTemplate: boolean) {

        const activeSlots = isTemplate ? this.activeSlots.template : this.activeSlots.page;

        const pageSlots = {};
        if (components) {
            for (const component of components) {
                const slotPosition = component.position;
                // if the position doesn't exist yet we add a new slot
                // with an empty component list
                if (!pageSlots[slotPosition]) {
                    pageSlots[slotPosition] = [];
                }
                pageSlots[slotPosition].push({
                    uid: component.uid,
                    typeCode: component.typeCode
                });
            }
        }

        // clear existing slots if they have not been updated by the data
        if (activeSlots) {
            for (const activeSlotKey of Object.keys(activeSlots)) {
                if (!pageSlots[activeSlotKey]) {
                    this.clearSlot(activeSlotKey);
                }
            }
        }

        // update all dynamic subject that have been filled before or in this page
        for (const key of Object.keys(pageSlots)) {
            this.storeSlot(key, pageSlots[key]);
        }

        isTemplate ? this.activeSlots.template = pageSlots : this.activeSlots.page = pageSlots ;

    }

    private storeComponent(key, model) {
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
