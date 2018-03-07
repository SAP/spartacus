import { Routes } from '@angular/router';

import { HomePageComponent } from './ui/pages/home-page/home-page.component';
import { CartPageComponent } from './ui/pages/cart-page/cart-page.component';
import { ProductPageComponent } from './ui/pages/product-page/product-page.component';
import { CategoryPageComponent } from './ui/pages/category-page/category-page.component';

import { PageNotFoundComponent } from './ui/pages/404/404.component';

import { CmsPageGuards } from './cms/guards/cms-page.guard';
import { ProductGuard } from './product/guards/product.guard';

// TODO: provide URL mappings for site specific routings
export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'homepage' },
    component: HomePageComponent
  },
  {
    path: 'cart',
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'cartPage' },
    component: CartPageComponent
  },
  {
    path: 'search/:query',
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent,
    data: { pageLabel: 'search' }
  },
  {
    path: 'product/:productCode',
    canActivate: [ProductGuard, CmsPageGuards],
    component: ProductPageComponent
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
    path:
      'Open-Catalogue/:category1/:category2/:category3/:category4/p/:productCode',
    redirectTo: 'product/:productCode'
  },

  {
    path: 'category/:categoryCode',
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent
  },
  {
    path: 'category/:categoryCode/:title',
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent
  },
  // {
  //   path: 'brand/:brandCode',
  //   canActivate: [CmsPageGuards],
  //   component: CategoryPageComponent
  // },
  // {
  //   path: 'brands/:brandCode/:title',
  //   canActivate: [CmsPageGuards],
  //   component: CategoryPageComponent
  // },
  {
    path: 'Brands/:brandName/c/:brandCode',
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent
  },

  {
    path: '**',
    component: PageNotFoundComponent
  }
];
