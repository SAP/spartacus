import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SalePageComponent } from './sale-page.component';
import { SalePageLayoutModule } from '../../layout/sale-page-layout/sale-page-layout.module';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: SalePageComponent,
    data: { pageLabel: 'homepage', cxPath: 'sale', breadcrumb: '/ Sale' } // TODO set a proper pageLabel when it's available in CMS
  }
];

@NgModule({
  imports: [CommonModule, SalePageLayoutModule, RouterModule.forChild(routes)],
  declarations: [SalePageComponent],
  exports: [SalePageComponent]
})
export class SalePageModule {}
