import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { CartPageLayoutModule } from '../../layout/cart-page-layout/cart-page-layout.module';

import { CartPageComponent } from './cart-page.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: CartPageComponent,
    data: { pageLabel: 'cartPage', cxPath: 'cart', breadcrumb: '/ Cart' }
  }
];

@NgModule({
  imports: [CommonModule, CartPageLayoutModule, RouterModule.forChild(routes)],
  declarations: [CartPageComponent],
  exports: [CartPageComponent]
})
export class CartPageModule {}
