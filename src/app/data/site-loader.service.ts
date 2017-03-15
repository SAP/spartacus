import { Injectable } from '@angular/core';
import { OccSiteService } from '../occ/occ-core/site.service';
import { ModelService } from './model.service';

const LANGUAGE_KEY = 'siteLanguages';
const CURRENCY_KEY = 'siteCurrencies';

@Injectable()
export class SiteLoaderService {

    constructor(
        protected occSiteService: OccSiteService,
        protected modelService: ModelService
    ) {}

    loadLanguages() {
        this.occSiteService.loadLanguages()
            .then((data) => {
                this.modelService.store(LANGUAGE_KEY, data);
        });
    }

    getLanguageSubscription() {
        return this.modelService.get(LANGUAGE_KEY);
    }

    loadCurrencies() {
        this.occSiteService.loadCurrencies()
            .then((data) => {
                this.modelService.store(CURRENCY_KEY, data);
        });
    }

    getCurrencySubscription() {
        return this.modelService.get(CURRENCY_KEY);
    }

}
