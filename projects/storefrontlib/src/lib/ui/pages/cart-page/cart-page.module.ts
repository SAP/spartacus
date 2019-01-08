import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { CartPageLayoutModule } from '../../layout/cart-page-layout/cart-page-layout.module';

import { CartPageComponent } from './cart-page.component';

const routes: Routes = [
  {
    path: 'cart',
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'cartPage', breadcrumb: '/ Cart' },
    component: CartPageComponent
  }
];

@NgModule({
  imports: [CommonModule, CartPageLayoutModule, RouterModule.forChild(routes)],
  declarations: [CartPageComponent],
  exports: [CartPageComponent]
})
export class CartPageModule {}
