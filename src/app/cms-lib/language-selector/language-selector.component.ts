import { Component, OnInit } from '@angular/core';
import { SiteLoaderService } from '../../data/site-loader.service';

@Component({
  selector: 'y-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

    languages;

    constructor(
        protected siteLoader: SiteLoaderService
    ) { }

    ngOnInit() {
        this.siteLoader.loadLanguages();
        this.siteLoader.getLanguageSubscription().subscribe((data) => {
            if (data) {
                this.languages = data.languages;
            }
        });
    }

}
