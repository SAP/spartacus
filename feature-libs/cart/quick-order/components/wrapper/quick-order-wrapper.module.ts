import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { QuickOrderComponent } from './quick-order-wrapper.component';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuickOrderComponent: {
          component: QuickOrderComponent,
        },
      },
    }),
  ],
  declarations: [QuickOrderComponent],
  exports: [QuickOrderComponent],
  entryComponents: [QuickOrderComponent],
})
export class QuickOrderWrapperModule {}
