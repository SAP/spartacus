import { Injectable } from '@angular/core';
import { OccSiteService } from '../occ/occ-core/site.service';
import { ModelService } from './model.service';
import { ConfigService } from './config.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const CONTEXT_CHANGE_KEY = 'siteContext';
const LANGUAGE_KEY = 'siteLanguages';
const CURRENCY_KEY = 'siteCurrencies';

@Injectable()
export class SiteContextService {

    activeLanguage = 'en';
    siteChanges = 0;

    constructor(
        protected occSiteService: OccSiteService,
        protected modelService: ModelService,
        protected configService: ConfigService
    ) {}

    updateSiteContext(clearCache?: boolean) {
        if (clearCache) {
            this.modelService.clear();
        }
        this.modelService.store(CONTEXT_CHANGE_KEY, ++this.siteChanges);
    }

    getSiteContextChangeSubscription() {
        return this.modelService.get(CONTEXT_CHANGE_KEY);
    }

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

    getActiveLanguage() {
        return this.activeLanguage;
    }

    setActiveLanguage(lang) {
        this.configService.site.language = lang.isocode;
        this.activeLanguage = lang.isocode;
    }
}
