import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  ConfigModule,
  ProductModule,
  ProductSearchService,
  RoutingService,
  UrlTranslationModule
} from '@spartacus/core';
import { CmsConfig } from '@spartacus/core';

import { BootstrapModule } from '../../bootstrap.module';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { MediaModule } from '../../ui/components/media/media.module';

import { SearchBoxComponentService } from './search-box-component.service';
import { SearchBoxComponent } from './search-box.component';

import { StripHighlightPipe } from './strip-highlight/strip-highlight.pipe';

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
  declarations: [SearchBoxComponent, StripHighlightPipe],
  entryComponents: [SearchBoxComponent],
  exports: [SearchBoxComponent]
})
export class SearchBoxModule {}
