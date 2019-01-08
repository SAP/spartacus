import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SalePageComponent } from './sale-page.component';
import { SalePageLayoutModule } from '../../layout/sale-page-layout/sale-page-layout.module';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

const routes: Routes = [
  {
    path: 'sale',
    canActivate: [CmsPageGuards],

    // TODO:
    // When 'sale page' is implemented in CMS backend,
    // then 'homepage' pageLabel should be changed to adequate one
    data: { pageLabel: 'homepage', breadcrumb: '/ Sale' },

    component: SalePageComponent
  }
];

@NgModule({
  imports: [CommonModule, SalePageLayoutModule, RouterModule.forChild(routes)],
  declarations: [SalePageComponent],
  exports: [SalePageComponent]
})
export class SalePageModule {}
