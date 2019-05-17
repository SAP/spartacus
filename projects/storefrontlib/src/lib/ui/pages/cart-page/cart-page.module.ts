import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsModule } from '../../../../cms-components/checkout/cart/cart-details/cart-details.module';
import { CmsModule, CmsPageGuard } from '../../../../cms-structure/index';
import { OutletRefModule } from '../../../../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { PageLayoutModule } from '../../../../cms-structure/page/index';
import { CartPageComponent } from './cart-page.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    component: CartPageComponent,
    data: { pageLabel: 'cartPage', cxRoute: 'cart' },
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
