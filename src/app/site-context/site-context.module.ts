import { NgModule } from "@angular/core";

import { CurrencySelectorModule } from "./currency-selector/currency-selector.module";
import { LanguageSelectorModule } from "./language-selector/language-selector.module";
import { ConfigService } from "./config.service";

@NgModule({
  imports: [CurrencySelectorModule, LanguageSelectorModule]
})
export class SiteContextModule {
  static forRoot(config: any): any {
    return {
      ngModule: SiteContextModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: config
        }
      ]
    };
  }
}
