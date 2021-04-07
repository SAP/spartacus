import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard, CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { QuickOrderListComponent } from './quick-order-list.component';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountQuickOrderComponent: {
          component: QuickOrderListComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [QuickOrderListComponent],
  exports: [QuickOrderListComponent],
  entryComponents: [QuickOrderListComponent],
})
export class QuickOrderListModule {}
