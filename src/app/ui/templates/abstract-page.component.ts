import { Injectable } from '@angular/core';
import { CmsModelService } from '../../data/cms-model.service';
import { CmsLoaderService } from '../../data/cms-loader.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';



// probably should move to the component lib... (we can't include it in the module anyway)
@Injectable()
export abstract class AbstractPage {
    
    constructor(
        protected router: Router,
        protected activeRoute: ActivatedRoute,
        protected cmsLoader: CmsLoaderService,
        protected cmsModelService: CmsModelService
    ) {

        // load data for each route change
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.loadCmsDataForUrl(val.url);
            }
        });

        // load data in case we have parameters
        activeRoute.params.forEach((params: Params) => {
            this.loadCmsDataForParams(params);
            this.loadAdditionData(params);
        });

     }

     loadCmsDataForUrl(url) {
        // TODO: make urls configurable
        switch (url) {
            case '/':
                this.cmsLoader.loadComponentsForIndex();
                break;
            case '/card':
                this.cmsLoader.loadComponentsForPage('cart');
                break;
            default:
                // this.cmsLoader.loadComponentsForIndex();
        };
     }

     loadCmsDataForParams(params: Params) {
        // TODO make constants for routing params

        if (params['categoryCode']) {
            this.cmsLoader.loadComponentsForCategory(params['categoryCode']);
        }

        if (params['productCode']) {
            this.cmsLoader.loadComponentsForProduct(params['productCode']);
        }

        if (params['query']) {
            this.cmsLoader.loadComponentsForPage('search');
        }
        
     }

     loadAdditionData(params: Params) {
         // TODO
     }

}
