import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuard } from '../../../cms/guards/cms-page.guard';

import { CartPageComponent } from './cart-page.component';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { CartDetailsModule } from '../../../cart/cart-details/cart-details.module';
import { OutletRefModule } from '../../../outlet/outlet-ref/outlet-ref.module';
import { CmsModule } from '../../../cms/cms.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    component: CartPageComponent,
    data: { pageLabel: 'cartPage', cxPath: 'cart' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    CartDetailsModule,
    OutletRefModule,
    CmsModule
  ],
  declarations: [CartPageComponent]
})
export class CartPageModule {}
