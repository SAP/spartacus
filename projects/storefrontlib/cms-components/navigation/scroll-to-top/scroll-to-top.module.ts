import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ScrollToTopComponent } from './scroll-to-top.component';

@NgModule({
  imports: [CommonModule, IconModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        PageTitleComponent: {
          component: ScrollToTopComponent,
        },
      },
    }),
  ],
  declarations: [ScrollToTopComponent],
  exports: [ScrollToTopComponent],
  entryComponents: [ScrollToTopComponent],
})
export class ScrollToTopModule {}
