import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { CartPageComponent } from './cart-page.component';
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
    PageLayoutModule,
    CartComponentModule
  ],
  declarations: [CartPageComponent],
  exports: [CartPageComponent]
})
export class CartPageModule {}
