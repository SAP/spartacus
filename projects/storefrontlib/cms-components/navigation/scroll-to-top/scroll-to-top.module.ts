import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '../../misc/icon/icon.module';
import { ScrollToTopComponent } from './scroll-to-top.component';

@NgModule({
  imports: [CommonModule, IconModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ScrollToTopComponent: {
          component: ScrollToTopComponent,
        },
      },
    }),
  ],
  declarations: [ScrollToTopComponent],
  exports: [ScrollToTopComponent],
})
export class ScrollToTopModule {}
