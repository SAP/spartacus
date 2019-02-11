import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  ConfigModule,
  ProductModule,
  ProductSearchService,
  RoutingService,
  UrlTranslationModule,
  StripHtmlModule
} from '@spartacus/core';
import { CmsConfig } from '@spartacus/core';

import { BootstrapModule } from '../../bootstrap.module';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { MediaModule } from '../../ui/components/media/media.module';

import { SearchBoxComponentService } from './search-box-component.service';
import { SearchBoxComponent } from './search-box.component';

@NgModule({
  imports: [
    CommonModule,
    BootstrapModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MediaModule,
    ProductModule,
    StripHtmlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SearchBoxComponent: {
          selector: 'cx-searchbox',
          providers: [
            {
              provide: SearchBoxComponentService,
              useClass: SearchBoxComponentService,
              deps: [CmsComponentData, ProductSearchService, RoutingService]
            }
          ]
        }
      }
    }),
    UrlTranslationModule
  ],
  declarations: [SearchBoxComponent],
  entryComponents: [SearchBoxComponent],
  exports: [SearchBoxComponent]
})
export class SearchBoxModule {}
