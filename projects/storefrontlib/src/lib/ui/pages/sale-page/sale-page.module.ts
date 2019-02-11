import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

import { SalePageComponent } from './sale-page.component';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { CmsModule } from '../../../cms/cms.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: SalePageComponent,
    data: { pageLabel: 'sale', cxPath: 'sale' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    CmsModule
  ],
  declarations: [SalePageComponent]
})
export class SalePageModule {}
