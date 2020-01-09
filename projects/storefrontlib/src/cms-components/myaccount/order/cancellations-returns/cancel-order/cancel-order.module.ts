import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, CmsConfig, ConfigModule } from '@spartacus/core';
import { PageLayoutComponent } from '../../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../../cms-structure/guards/cms-page.guard';
import { CancelOrReturnItemsModule } from '../cancel-or-return-items/cancel-or-return-items.module';
import { CancelOrderComponent } from './cancel-order.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          pageLabel: '/my-account/order/cancel',
          cxRoute: 'orderCancel',
        },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CancelOrderComponent: {
          component: CancelOrderComponent,
          guards: [AuthGuard],
        },
      },
    }),
    CancelOrReturnItemsModule,
  ],
  declarations: [CancelOrderComponent],
  exports: [CancelOrderComponent],
  entryComponents: [CancelOrderComponent],
})
export class CancelOrderModule {}
