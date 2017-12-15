import { Injectable, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CmsService } from '../data/cms.service';

@Injectable()
export abstract class AbstractCmsComponent implements OnDestroy {

    protected subscription: Subscription;
    protected uid: string;
    @Input()
    public component: any = null;
    protected contextParameters: any;

    constructor(
        protected cd: ChangeDetectorRef,
        protected cmsService: CmsService
    ) {}

    setContextParameters(contextParameters: any) {
        this.contextParameters = contextParameters;
    }

    bootstrap() {
        this.subscription = this.cmsService.getComponentSubscription(this.uid)
            .subscribe((componentData) => {
                this.component = componentData;
                this.fetchData();
            });
    }

    protected fetchData() {
        this.cd.detectChanges();
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

    protected getBaseUrl() {
        return this.cmsService.baseUrl;
    }


    // TODO: move to strategy
    protected mapUrl(url: string) {

        // console.warn('mapUrl', url);
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
