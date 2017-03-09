import { Injectable, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AbstractComponent } from './abstract-component';

import { ConfigService } from './config.service';
import { CmsModelService } from '../data/cms-model.service';

@Injectable()
export abstract class AbstractCmsComponent extends AbstractComponent implements OnInit, OnDestroy {
    
    protected subscription;

    protected uid: string;
    protected contextParameters: any;
    protected model = null;

    constructor(
        protected cd: ChangeDetectorRef,
        protected configService: ConfigService,
        protected cmsModelService: CmsModelService
    ) {
        super (cd, configService);
    }

    ngOnInit() {
        this.subscription = this.cmsModelService.getComponentSubscription(this.uid)
            .subscribe((componentData) => {
                this.model = componentData;
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

    setUid(uid: string) {
        this.uid = uid;
    }

    setContextParameters(contextParameters: any) {
        this.contextParameters = contextParameters;
    }

    protected getBaseUrl() {
        return this.configService.settings.baseUrl;
    }

    protected mapUrl(url: string) {
        // TODO: map

        let newUrl = '';
        // console.log(url);
        if (url) {
            const isBrand = url.indexOf('/brand/');
            const isCategory = url.indexOf('/c/');
            const isProduct = url.indexOf('/p/');
            if (isBrand > -1) {
                newUrl = '/Brands/' + url.substr(isBrand + 7);
            }
            if (isCategory > -1) {
                newUrl = '/category/' + url.substr(isCategory + 3);
            }
            if (isProduct > -1) {
                newUrl = '/product/' + url.substr(isProduct + 3);
            }
        }
        

        return newUrl;
    }


}
