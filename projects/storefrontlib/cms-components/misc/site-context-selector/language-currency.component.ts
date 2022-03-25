import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-language-currency-selector',
  template: `
    <cx-site-context-selector context="language"></cx-site-context-selector>
    <cx-site-context-selector context="currency"></cx-site-context-selector>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageCurrencyComponent {}
