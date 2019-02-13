import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

import { CategoryPageComponent } from './category-page.component';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { ProductListModule } from '../../../product/components/product-list/product-list.module';
import { OutletRefModule } from '../../../outlet/outlet-ref/outlet-ref.module';

const routes: Routes = [
  // the search page is actually a conent page in the backend, but as longs as we haven't
  // converted our search list and refinement components, we keep them here.
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent,
    data: { cxPath: 'category' }
  },
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent,
    data: { cxPath: 'brand' }
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
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    ProductListModule,
    OutletRefModule
  ],
  declarations: [CategoryPageComponent]
})
export class CategoryPageModule {}
