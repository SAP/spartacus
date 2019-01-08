import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { CategoryPageLayoutModule } from '../../layout/category-page-layout/category-page-layout.module';
import { ProductListPageLayoutModule } from '../../layout/product-list-page-layout/product-list-page-layout.module';

import { CategoryPageComponent } from './category-page.component';

const routes: Routes = [
  {
    path: 'search/:query',
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent,
    data: { pageLabel: 'search' }
  },

  // redirect OLD links
  {
    path: 'Open-Catalogue/:categoryTitle/c/:categoryCode',
    redirectTo: '/category/:categoryCode/:categoryTitle'
  },
  {
    path: 'Open-Catalogue/:category1/:categoryTitle/c/:categoryCode',
    redirectTo: '/category/:categoryCode/:categoryTitle'
  },
  {
    path: 'Open-Catalogue/:category1/:category2/:categoryTitle/c/:categoryCode',
    redirectTo: '/category/:categoryCode/:categoryTitle'
  },
  {
    path: 'OpenCatalogue/:category1/:category2/:categoryTitle/c/:categoryCode',
    redirectTo: '/category/:categoryCode/:categoryTitle'
  },
  {
    path: 'category/:categoryCode',
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent
  },
  {
    path: 'category/:categoryCode/:title',
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent,
    data: { breadcrumb: '/ Categories' }
  },
  {
    path: 'Brands/:brandName/c/:brandCode',
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent,
    data: { breadcrumb: '/ Brands' }
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
