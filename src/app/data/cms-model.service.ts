import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


const PAGE_PREFIX = 'page';
const SLOT_PREFIX = 'slot';
const COMPONENT_PREFIX = 'comp';

/**
 * This service currently contains logic and (cached) component and slot models
 */
@Injectable()
export class CmsModelService {

    private subscriptions: Array<BehaviorSubject<any>> = [];
    
    private activeSlots = {
        template: {},
        page: {}
    };

    public getComponentSubscription(key: string): BehaviorSubject<any> {
        return this.getSubscription(COMPONENT_PREFIX + key);
    }
    public getSlotSubscription(key: string): BehaviorSubject<any> {
        return this.getSubscription(SLOT_PREFIX + key);
    }
    public getPageSubscription(key: string): BehaviorSubject<any> {
        return this.getSubscription(PAGE_PREFIX + key);
    }
    /**
     * @desc Used by clients to get latest updates
     */
    private getSubscription(key: string): BehaviorSubject<any> {
        if (!this.subscriptions[key]) {
            this.subscriptions[key] = new BehaviorSubject<any>(null);
        }
        return this.subscriptions[key];
    }


    public storePageData(pageData: any, isTemplate: boolean) {
        this.storeComponents(pageData.components);
        this.updateSlots(pageData.components, isTemplate);
        if (!isTemplate) {
            this.store(PAGE_PREFIX + pageData.pageType, {
                pageId: pageData.pageId,
                templateId: pageData.templateId
            });
        }
    }

    public storeComponent(key, model) {
        this.store(COMPONENT_PREFIX + key, model);
    }

    /**
     * @desc stores all components from the list if they haven't been stored before.
     * @param components list of components
     */
    private storeComponents(components: Array<any>) {
        if (components) {
            for (const component of components) {
                this.storeComponent(component.uid, component);
            }
        }
    }
    
    /**
     * @desc
     * Stores a model and updates the subject
     * @param key the key for the model
     * @param model the model
     */
    private store(key, model) {
        if (this.isAlreadyStored(key, model)) {
            return;
        }
        const subscription = this.getSubscription(key);
        subscription.next(model);
    }

    /**
     * @desc
     * Clears existing slot (or component) in case it was loaded previously
     * this happens during navigation from one page to another.
    */
    clear(key) {
        const subscription = this.getSubscription(key);
        subscription.next(null);
    }

    /**
     * Detects whether the model is acurate
     * @param key 
     * @param model 
     */
    isAlreadyStored(key, model): boolean {
        const subscription = this.getSubscription(key);
        return (JSON.stringify(subscription.value) === JSON.stringify(model));
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
                    this.clear(SLOT_PREFIX + activeSlotKey);
                }
            }
        }

        // update all dynamic subject that have been filled before or in this page
        for (const key of Object.keys(pageSlots)) {
            this.store(SLOT_PREFIX + key, pageSlots[key]);
        }

        isTemplate ? this.activeSlots.template = pageSlots : this.activeSlots.page = pageSlots ;

    }

}
