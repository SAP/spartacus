import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { MediaModule } from '../../../shared/components/media/media.module';
import { IconModule } from '../../misc/icon/icon.module';
import { HighlightPipe } from './highlight.pipe';
import { SearchBoxComponent } from './search-box.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    IconModule,
    UrlModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SearchBoxComponent: {
          component: SearchBoxComponent,
        },
      },
    }),
  ],
  declarations: [SearchBoxComponent, HighlightPipe],
  exports: [SearchBoxComponent, HighlightPipe],
})
export class SearchBoxModule {}
