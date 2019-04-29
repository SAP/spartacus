import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsModule } from '../../../../cms-components/checkout/cart/cart-details/cart-details.module';
import { CmsModule } from '../../../cms/cms.module';
import { CmsPageGuard } from '../../../cms/guards/cms-page.guard';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { OutletRefModule } from '../../../outlet/outlet-ref/outlet-ref.module';
import { CartPageComponent } from './cart-page.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    component: CartPageComponent,
    data: { pageLabel: 'cartPage', cxPath: 'cart' },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    CartDetailsModule,
    OutletRefModule,
    CmsModule,
  ],
  declarations: [CartPageComponent],
})
export class CartPageModule {}
