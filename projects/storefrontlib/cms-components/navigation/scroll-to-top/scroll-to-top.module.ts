import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CmsConfig,
  provideDefaultConfig,
  ScrollBehavior,
} from '@spartacus/core';
import { IconModule } from '../../misc/icon/icon.module';
import { ScrollToTopComponent } from './scroll-to-top.component';

@NgModule({
  imports: [CommonModule, IconModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ScrollToTopComponent: {
          component: ScrollToTopComponent,
          data: {
            scrollBehavior: ScrollBehavior.SMOOTH,
            displayThreshold: 200,
          },
        },
      },
    }),
  ],
  declarations: [ScrollToTopComponent],
  exports: [ScrollToTopComponent],
})
export class ScrollToTopModule {}
