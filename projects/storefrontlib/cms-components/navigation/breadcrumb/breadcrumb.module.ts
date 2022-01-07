import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  PageMetaModule,
  provideDefaultConfig,
  I18nModule,
} from '@spartacus/core';
import { BreadcrumbComponent } from './breadcrumb.component';
import { DebounceTimeModule } from '../../../shared/pipes/debounce-time/debounce-time.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PageMetaModule,
    I18nModule,
    DebounceTimeModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        BreadcrumbComponent: {
          component: BreadcrumbComponent,
        },
      },
    }),
  ],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
