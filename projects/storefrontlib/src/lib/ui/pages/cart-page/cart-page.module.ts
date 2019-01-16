import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

import { CartPageComponent } from './cart-page.component';
import { PageTemplateModule } from '../../layout/page-template/page-template.module';
import { CartComponentModule } from '../../../cart';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: CartPageComponent,
    data: { pageLabel: 'cartPage', cxPath: 'cart' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageTemplateModule,
    CartComponentModule
  ],
  declarations: [CartPageComponent],
  exports: [CartPageComponent]
})
export class CartPageModule {}
