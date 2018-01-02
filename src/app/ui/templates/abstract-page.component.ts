import { Injectable } from '@angular/core';
import { CmsService } from '../../data/cms.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';



// probably should move to the component lib... (we can't include it in the module anyway)
@Injectable()
export abstract class AbstractPage {
    subscriptions = {};

    constructor(
        protected router: Router,
        protected activeRoute: ActivatedRoute,
        protected cmsService: CmsService,
    ) {
        // load data for each route change
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                //this.loadCmsDataForUrl(val.url);
            }
        });

        // load data in case we have parameters
        activeRoute.params.forEach((params: Params) => {
            //this.loadCmsDataForParams(params);
            //this.loadAdditionData(params);
        });
     }

     loadCmsDataForUrl(url) {
        // TODO: make urls configurable
        switch (url) {
            case '/':
                this.cmsService.getPageData('homepage', null, null, null);
                break;
            case '/cart':
                this.cmsService.getPageData('cartPage', null, null, null);
                break;
            default:
        };
     }

     loadCmsDataForParams(params: Params) {
        // TODO make constants for routing params

        if (params['categoryCode']) {
            this.cmsService.getPageData(null, null, params['categoryCode'], null);
        }
        
        if (params['brandCode']) {
            this.cmsService.getPageData(null, null, params['brandCode'], null);
        }

        if (params['productCode']) {
            this.cmsService.getPageData(null, params['productCode'], null, null);
        }

        if (params['query']) {
            this.cmsService.getPageData('search', null, null, null);
        }
     }

     loadAdditionData(params: Params) {
         // TODO
     }

}
