import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { CategoryPageLayoutModule } from '../../layout/category-page-layout/category-page-layout.module';
import { ProductListPageLayoutModule } from '../../layout/product-list-page-layout/product-list-page-layout.module';

import { CategoryPageComponent } from './category-page.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent,
    data: { pageLabel: 'search', cxPath: 'search' }
  },

  // redirect OLD links
  {
    path: 'Open-Catalogue/:title/c/:categoryCode',
    redirectTo: null,
    data: { cxRedirectTo: 'category' }
  },
  {
    path: 'Open-Catalogue/:category1/:title/c/:categoryCode',
    redirectTo: null,
    data: { cxRedirectTo: 'category' }
  },
  {
    path: 'Open-Catalogue/:category1/:category2/:title/c/:categoryCode',
    redirectTo: null,
    data: { cxRedirectTo: 'category' }
  },
  {
    path: 'OpenCatalogue/:category1/:category2/:title/c/:categoryCode',
    redirectTo: null,
    data: { cxRedirectTo: 'category' }
  },

  {
    path: null,
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent,
    data: { cxPath: 'category' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    CategoryPageLayoutModule,
    ProductListPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoryPageComponent],
  exports: [CategoryPageComponent]
})
export class CategoryPageModule {}
