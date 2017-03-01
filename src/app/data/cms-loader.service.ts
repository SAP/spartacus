import { Injectable } from '@angular/core';
import { OccCmsService } from '../occ/occ-cms/occ-cms.service';
import { CmsModelService } from './cms-model.service';

const PAGE_COMPONENTS = 0;
const TEMPLATE_COMPONENTS = 1;
const TEMPLATE_PAGE = true;

@Injectable()
export class CmsLoaderService {

    
    private activeSlots = {};

    constructor(
        private occCmsService: OccCmsService,
        private cmsModelService: CmsModelService
    ) { }

    loadComponentsForIndex() {
        const components = this.occCmsService.loadComponentsForIndex();
        components.then((pageData) => {
            this.loadComponentsForTemplate(pageData, pageData.pageLabel);
            this.storeComponents(pageData.components, PAGE_COMPONENTS);
        });
    }

    loadComponentsForPage(pageLabel: string) {
        const components = this.occCmsService.loadComponentsForPage(pageLabel);
        components.then((pageData) => {
            this.loadComponentsForTemplate(pageData, pageLabel);
            this.storeComponents(pageData.components, PAGE_COMPONENTS);
        });
    }

    private loadComponentsForTemplate(pageData: any, code?: string) {
        let components;
        if (pageData.pageType === 'ContentPage') {
            components = this.occCmsService.loadComponentsForPage(pageData.pageLabel, TEMPLATE_PAGE);
        }
        if (pageData.pageType === 'ProductPage') {
            components = this.occCmsService.loadComponentsForProduct(code, TEMPLATE_PAGE);
        }
        if (pageData.pageType === 'CategoryPage') {
            components = this.occCmsService.loadComponentsForCategory(code, TEMPLATE_PAGE);
        }
        components.then((data) => {
            this.storeComponents(data.components, TEMPLATE_COMPONENTS);
        });
    }


    private storeComponents(components: Array<any>, componentType: number) {

        const pageSlots = {};

        // store all components
        // component slots will be 
        if (components) {
            for (const component of components) {
                const slotPosition = component.position;
                // if the position doesn't exist yet we add a new slot
                // with an empty component list
                if (!pageSlots[slotPosition]) {
                    pageSlots[slotPosition] = [];
                }
                // store the component
                this.cmsModelService.storeComponent(component.uid, component);

                // store component in slot... WHY?
                pageSlots[slotPosition].push({
                    uid: component.uid,
                    typeCode: component.typeCode
                });
            }
        }

        // // create pageSlots with en empty component list for those slots
        // // that have been filled before so that they will get pushed
        // for (const activeSlotKey of Object.keys(this.activeSlots[componentType])) {
        //     if (!pageSlots[activeSlotKey]) {
        //         pageSlots[activeSlotKey] = {
        //             components: []
        //         };
        //     }
        // }
        
        // update all dynamic subject that have been filled before or in this page
        for (const key of Object.keys(pageSlots)) {
            this.cmsModelService.storeSlot(key, pageSlots[key]);
            // this.getSubject(SLOT_PREFIX + key).next(pageSlots[key]);
            // this.getSubject(SLOT_PREFIX + key).complete();
        }

        // update the activeSlots with the page slots
        // this.activeSlots[componentType] = pageSlots;
    }

    // private storeComponentData(componentData) {
        
    //     // this.cache.storeComponent(componentData);

    //     // if (!this.cache.hasComponent(componentData.uid)) {

    //     // }
        
    // }

}
