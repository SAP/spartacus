import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LanguageService } from '@spartacus/core';

@Component({
  selector: 'cx-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  languages$: Observable<any>;
  activeLanguage$: Observable<string>;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languages$ = this.languageService.languages$;
    this.activeLanguage$ = this.languageService.selectedLanguage$;
  }

  setActiveLanguage(language) {
    this.languageService.select(language);
  }
}
