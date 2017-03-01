import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationStart} from '@angular/router';

import { CmsLoaderService } from '../data/cms-loader.service';

@Injectable()
export class RouteEvents {

    constructor(
        private router: Router,
        private cmsLoader: CmsLoaderService
    ) {

        // load data for each route change
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.loadDataForRoute(val.url);
            }
        });

    }

    loadDataForRoute(url: string) {
        // console.log(url);
        switch (url) {
            case '/card':
                this.cmsLoader.loadComponentsForPage('cart');
                break;
            default:
                this.cmsLoader.loadComponentsForIndex();
        };

        // this.cmsLoader.load()
    }

}
