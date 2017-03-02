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
            console.log('load templates for', pageData.pageLabel);
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

        this.cmsModelService.storeComponents(components);
        this.cmsModelService.updateSlots(components, componentType === TEMPLATE_COMPONENTS);
    }
    
}
