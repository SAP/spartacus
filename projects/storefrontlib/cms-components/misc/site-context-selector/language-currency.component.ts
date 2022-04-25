import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SiteContextType } from './site-context.model';

@Component({
  selector: 'cx-language-currency-selector',
  template: `
    <cx-site-context-selector
      [context]="SiteContextType.LANGUAGE"
    ></cx-site-context-selector>
    <cx-site-context-selector
      [context]="SiteContextType.CURRENCY"
    ></cx-site-context-selector>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageCurrencyComponent {
  readonly SiteContextType = SiteContextType;
}
