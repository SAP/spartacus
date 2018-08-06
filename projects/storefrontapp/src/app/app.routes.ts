import { Routes } from '@angular/router';
import {CmsPageGuards} from '../../../storefrontlib/src/lib/cms/guards';
import {HomePageComponent} from '../../../storefrontlib/src/lib/ui/pages/home-page/home-page.component';
import {CartPageComponent} from '../../../storefrontlib/src/lib/ui/pages/cart-page/cart-page.component';
import {AuthGuard, NotAuthGuard} from '../../../storefrontlib/src/lib/user/guards';
import {MultiStepCheckoutPageComponent} from '../../../storefrontlib/src/lib/ui/pages/multi-step-checkout-page/multi-step-checkout-page.component';
import {OrderConfirmationPageComponent} from '../../../storefrontlib/src/lib/ui/pages/order-confirmation-page/order-confirmation-page.component';
import {CategoryPageComponent} from '../../../storefrontlib/src/lib/ui/pages/category-page/category-page.component';
import {ProductGuard} from '../../../storefrontlib/src/lib/product/guards';
import {ProductPageComponent} from '../../../storefrontlib/src/lib/ui/pages/product-page/product-page.component';
import {OrderHistoryPageComponent} from '../../../storefrontlib/src/lib/ui/pages/order-history-page/order-history-page.component';
import {OrderDetailsPageComponent} from '../../../storefrontlib/src/lib/ui/pages/order-details-page/order-details-page.component';
import {RegisterComponent} from '../../../storefrontlib/src/lib/user/components/register/register.component';
import {PageNotFoundComponent} from '../../../storefrontlib/src/lib/ui/pages/404/404.component';

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
    path: 'my-account/orders',
    canActivate: [AuthGuard, CmsPageGuards],
    component: OrderHistoryPageComponent,
    data: { pageLabel: 'orders' }
  },
  {
    path: 'my-account/orders/:orderCode',
    canActivate: [AuthGuard, CmsPageGuards],
    component: OrderDetailsPageComponent,
    data: { pageLabel: 'order' }
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
