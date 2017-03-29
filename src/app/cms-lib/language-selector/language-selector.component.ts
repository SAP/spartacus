import { Component, OnInit } from '@angular/core';
import { SiteContextService } from '../../data/site-context.service';

@Component({
  selector: 'y-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

    languages;
    activeLanguage;

    constructor(
        protected siteContext: SiteContextService
    ) { }

    ngOnInit() {
        this.siteContext.loadLanguages();
        this.siteContext.getLanguageSubscription().subscribe((data) => {
            if (data) {
                this.languages = data.languages;
                this.activeLanguage = this.languages[0];
            }
        });
    }

    setActiveLanguage(language) {
        this.siteContext.setActiveLanguage(language);
        this.activeLanguage = language;
        this.siteContext.updateSiteContext(true);
    }

}
