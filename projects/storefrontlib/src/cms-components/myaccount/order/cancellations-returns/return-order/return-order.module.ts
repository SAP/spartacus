import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, CmsConfig, ConfigModule } from '@spartacus/core';
import { PageLayoutComponent } from '../../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../../cms-structure/guards/cms-page.guard';
import { CancelOrReturnItemsModule } from '../cancel-or-return-items/cancel-or-return-items.module';
import { ReturnOrderComponent } from './return-order.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          pageLabel: '/my-account/order/return',
          cxRoute: 'orderReturn',
        },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ReturnOrderComponent: {
          component: ReturnOrderComponent,
          guards: [AuthGuard],
        },
      },
    }),
    CancelOrReturnItemsModule,
  ],
  declarations: [ReturnOrderComponent],
  exports: [ReturnOrderComponent],
  entryComponents: [ReturnOrderComponent],
})
export class ReturnOrderModule {}
