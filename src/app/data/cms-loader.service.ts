import { Injectable } from '@angular/core';
import { OccCmsService } from '../occ/occ-cms/occ-cms.service';
import { CmsModelService } from './cms-model.service';

const PAGE_COMPONENTS = 0;
const TEMPLATE_COMPONENTS = 1;
const TEMPLATE_PAGE = true;

const IS_PAGE = false;
const IS_TEMPLATE = true;

const INDEX_TYPE        = 1;
const PAGE_TYPE         = 2;
const CATEGORY_TYPE     = 3;
const PRODUCT_TYPE      = 4;


@Injectable()
export class CmsLoaderService {

    latest = {
        type: null,
        context: null
    };

    constructor(
        private occCmsService: OccCmsService,
        private cmsModelService: CmsModelService
    ) {}

    refresh() {
        switch (this.latest.type) {
            case PAGE_TYPE:
                this.loadComponentsForPage(this.latest.context);
                break;
            case CATEGORY_TYPE:
                this.loadComponentsForCategory(this.latest.context);
                break;
            case PRODUCT_TYPE:
                this.loadComponentsForProduct(this.latest.context);
                break;
            default:
                this.loadComponentsForIndex();
        }
    }

    loadComponentsForIndex() {
        this.latest.type = INDEX_TYPE;
        this.latest.context = null;
        const components = this.occCmsService.loadComponentsForIndex();
        components.then((pageData) => {
            this.loadComponentsForTemplate(pageData, pageData.pageLabel);
            this.cmsModelService.storePageData(pageData, IS_PAGE);
        });
    }

    loadComponentsForPage(pageLabel: string) {
        this.latest.type = PAGE_TYPE;
        this.latest.context = pageLabel;
        const components = this.occCmsService.loadComponentsForPage(pageLabel);
        components.then((pageData) => {
            this.loadComponentsForTemplate(pageData, pageLabel);
            this.cmsModelService.storePageData(pageData, IS_PAGE);
        });
    }

    loadComponentsForCategory(categoryCode: string) {
        if (!categoryCode) {
            return;
        }
        this.latest.type = CATEGORY_TYPE;
        this.latest.context = categoryCode;
        const components = this.occCmsService.loadComponentsForCategory(categoryCode);
        components.then((pageData) => {
            this.loadComponentsForTemplate(pageData, categoryCode);
            this.cmsModelService.storePageData(pageData, IS_PAGE);
        });
    }

    loadComponentsForProduct(productCode: string) {
        this.latest.type = PRODUCT_TYPE;
        this.latest.context = productCode;
        const components = this.occCmsService.loadComponentsForProduct(productCode);
        components.then((pageData) => {
            this.loadComponentsForTemplate(pageData, productCode);
            this.cmsModelService.storePageData(pageData, IS_PAGE);
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
            this.cmsModelService.storePageData(data, IS_TEMPLATE);
        });
    }

}
