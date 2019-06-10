import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-language-currency-selector',
  template: `
    <cx-site-context-selector context="LANGUAGE"></cx-site-context-selector>
    <cx-site-context-selector context="CURRENCY"></cx-site-context-selector>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageCurrencyComponent {}
