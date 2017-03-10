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


    // TODO: move to strategy
    protected mapUrl(url: string) {

        let newUrl = '';

        if (url) {
            const brandFragment = this.getUrlParam(url, '/Brands/');
            const categoryFragment = this.getUrlParam(url, '/c/');
            const productFragment = this.getUrlParam(url, '/p/');
            if (brandFragment) {
                newUrl = '/brand/' + categoryFragment;
            }else if (categoryFragment) {
                newUrl = '/category/' + categoryFragment;
            }else if (productFragment) {
                newUrl = '/product/' + productFragment;
            }else {
                if (url !== '/') {
                    console.warn('couldn\'t map url', url);
                }
            }
        }
        return newUrl;
    }

    private getUrlParam(url, param) {
        const fragment = url.indexOf(param);
        return fragment > -1 ? url.substr(fragment + param.length) : null;
    }
    

}
