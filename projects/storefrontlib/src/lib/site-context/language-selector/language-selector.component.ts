import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { SiteContextService } from '@spartacus/core';

@Component({
  selector: 'y-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  languages$: Observable<any>;
  activeLanguage$: Observable<string>;
  subscription: Subscription;

  constructor(private siteContextService: SiteContextService) {}

  ngOnInit() {
    this.languages$ = this.siteContextService.languages$;
    this.activeLanguage$ = this.siteContextService.activeLanguage$;
  }

  setActiveLanguage(language) {
    this.siteContextService.activeLanguage = language;
  }
}
