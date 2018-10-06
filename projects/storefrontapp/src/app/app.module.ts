import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StorefrontComponent, StorefrontModule } from '@spartacus/storefront';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MySearchBoxServiceService } from './my-search-box-service.service';
import { SearchBoxComponentService } from '../../../storefrontlib/src/lib/cms-lib/search-box/search-box-component.service';

const devImports = [];

if (!environment.production) {
  devImports.push(StoreDevtoolsModule.instrument());
}

@NgModule({
  imports: [
    BrowserModule,
    StorefrontModule.withConfig({
      server: {
        baseUrl: environment.occBaseUrl
      },
      cmsComponentServiceProviders: {
        SearchBoxComponent: {
          provide: SearchBoxComponentService,
          useClass: MySearchBoxServiceService
        }
      }
    }),
    ...devImports
  ],
  bootstrap: [StorefrontComponent]
})
export class AppModule {}
