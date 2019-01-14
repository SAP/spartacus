import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MediaModule } from '../../ui/components/media/media.module';

import { SearchBoxComponent } from './search-box.component';
import { BootstrapModule } from '../../bootstrap.module';
import {
  ConfigModule,
  ProductModule,
  ProductSearchService,
  RoutingService,
  UrlTranslationModule
} from '@spartacus/core';
import { SearchBoxComponentService } from './search-box-component.service';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { CmsConfig } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    BootstrapModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MediaModule,
    ProductModule,
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
