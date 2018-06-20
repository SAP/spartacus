import { Routes } from '@angular/router';

import { HomePageComponent } from 'storefrontlib';
import { CartPageComponent } from 'storefrontlib';
import { ProductPageComponent } from 'storefrontlib';
import { CategoryPageComponent } from 'storefrontlib';
import { MultiStepCheckoutPageComponent } from 'storefrontlib';
import { OrderConfirmationPageComponent } from 'storefrontlib';
import { RegisterComponent } from 'storefrontlib';

import { PageNotFoundComponent } from 'storefrontlib';

import { CmsPageGuards } from 'storefrontlib';
import { ProductGuard } from 'storefrontlib';
import { AuthGuard } from 'storefrontlib';
import { NotAuthGuard } from 'storefrontlib';

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
    path: 'checkout',
    canActivate: [AuthGuard, CmsPageGuards],
    data: { pageLabel: 'multiStepCheckoutSummaryPage' },
    component: MultiStepCheckoutPageComponent
  },
  {
    path: 'orderConfirmation',
    canActivate: [AuthGuard, CmsPageGuards],
    data: { pageLabel: 'orderConfirmationPage' },
    component: OrderConfirmationPageComponent
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
  {
    path: 'register',
    canActivate: [NotAuthGuard, CmsPageGuards],
    component: RegisterComponent,
    data: { pageLabel: 'login' }
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
    component: PageNotFoundComponent,
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'notFound' }
  }
];
