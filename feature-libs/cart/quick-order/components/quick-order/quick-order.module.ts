import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { QuickOrderComponent } from './quick-order.component';
import { QuickOrderFormModule } from '../form/quick-order-form.module';
import { QuickOrderListModule } from '../list/quick-order-list.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    QuickOrderListModule,
    QuickOrderFormModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountQuickOrderComponent: {
          component: QuickOrderComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuickOrderComponent],
  exports: [QuickOrderComponent],
  entryComponents: [QuickOrderComponent],
})
export class QuickOrderModule {}
