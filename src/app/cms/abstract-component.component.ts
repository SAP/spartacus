import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { CmsModelService } from '../data/cms-model.service';
// import { ComponentBuilderService } from './component-builder.service';
import { ConfigService } from './config.service';


// probably should move to the component lib... (we can't include it in the module anyway)
@Injectable()
export abstract class AbstractComponent implements OnInit, OnDestroy {
    
    protected subscription;

    protected uid: string;
    protected data = null;


    constructor(
        protected cmsModelService: CmsModelService
    ) { }

    ngOnInit() {
        this.subscription = this.cmsModelService.getSubscription(this.uid)
            .subscribe((componentData) => {
                this.data = componentData;
                this.fetchData();
            });
    }

    protected fetchData() {
        // can be used by implementations
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    setUid(uid) {
        this.uid = uid;
    }

    protected getBaseUrl() {
        return 'https://localhost:9002/';
        // return this.configService.settings.baseUrl;
    }

    protected mapUrl(url: string) {
        // TODO: map

        let newUrl = '';
        
        const isCategory = url.indexOf('/c/');
        const isProduct = url.indexOf('/p/');
        if (isCategory > -1) {
            newUrl = '/category/' + url.substr(isCategory + 3);
        }
        if (isProduct > -1) {
            newUrl = '/product/' + url.substr(isProduct + 3);
        }

        return newUrl;
    }


}
