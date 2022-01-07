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
import { DebounceTimePipe } from '../../../shared/pipes/debounce-time/debounce-time.pipe';

@NgModule({
  imports: [CommonModule, RouterModule, PageMetaModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        BreadcrumbComponent: {
          component: BreadcrumbComponent,
        },
      },
    }),
  ],
  declarations: [BreadcrumbComponent, DebounceTimePipe],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
