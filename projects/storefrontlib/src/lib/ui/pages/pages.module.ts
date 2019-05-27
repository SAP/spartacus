import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule } from '@spartacus/core';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import {
  PageLayoutComponent,
  PageLayoutModule,
} from '../../../cms-structure/page/index';
import { defaultRoutingConfig } from './default-routing-config';
import { OrderConfirmationPageModule } from './order-confirmation-page/order-confirmation-page.module';

@NgModule({
  imports: [
    ConfigModule.withConfig(defaultRoutingConfig),
    CommonModule,
    OrderConfirmationPageModule,
    PageLayoutModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'search', cxRoute: 'search' },
      },
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'brand' },
      },
    ]),
  ],
})
export class PagesModule {}
