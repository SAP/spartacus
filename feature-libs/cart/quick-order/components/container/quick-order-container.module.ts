import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { QuickOrderFormModule } from '../form/quick-order-form.module';
import { QuickOrderComponent } from './quick-order-container.component';

@NgModule({
  imports: [CommonModule, I18nModule, QuickOrderFormModule],
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
export class QuickOrderContainerModule {}
