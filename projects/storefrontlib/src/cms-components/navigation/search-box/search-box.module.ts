import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  ProductModule,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { MediaModule } from '../../../shared/components/media/media.module';
import { HighlightPipe } from './highlight.pipe';
import { SearchBoxComponent } from './search-box.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    ProductModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SearchBoxComponent: {
          component: SearchBoxComponent,
        },
      },
    }),
    IconModule,
    UrlModule,
    I18nModule,
  ],
  declarations: [SearchBoxComponent, HighlightPipe],
  entryComponents: [SearchBoxComponent],
  exports: [SearchBoxComponent],
})
export class SearchBoxModule {}
