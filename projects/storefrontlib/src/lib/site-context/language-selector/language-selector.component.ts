import { Component, OnInit } from '@angular/core';

import { LanguageService, Language } from '@spartacus/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'cx-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  languages$: Observable<Language[]>;
  activeLanguage$: Observable<string>;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languages$ = this.languageService.get();
    this.activeLanguage$ = this.languageService.getActive();
  }

  setActiveLanguage(language: string) {
    this.languageService.setActive(language);
  }
}
