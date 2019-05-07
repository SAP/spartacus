import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  ProductModule,
  ProductSearchService,
  RoutingService,
  StripHtmlModule,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { BootstrapModule } from '../../../lib/bootstrap.module';
import { MediaModule } from '../../../shared/index';
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
              deps: [CmsComponentData, ProductSearchService, RoutingService],
            },
          ],
        },
      },
    }),
    IconModule,
    UrlModule,
    I18nModule,
  ],
  declarations: [SearchBoxComponent],
  entryComponents: [SearchBoxComponent],
  exports: [SearchBoxComponent],
})
export class SearchBoxModule {}
