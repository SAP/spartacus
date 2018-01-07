import { Routes } from "@angular/router";

import { HomePageComponent } from "./ui/templates/home-page/home-page.component";
import { CartPageComponent } from "./ui/templates/cart-page/cart-page.component";
import { ProductDetailPageComponent } from "./ui/templates/product-detail-page/product-detail-page.component";
import { ProductListPageComponent } from "./ui/templates/product-list-page/product-list-page.component";
import { CategoryPageComponent } from "./ui/templates/category-page/category-page.component";

import { PageNotFoundComponent } from "./ui/templates/404/404.component";

import { CmsPageGuards } from "./newcms/guards/cms-page.guard";

// TODO: provide URL mappings for site specific routings
export const appRoutes: Routes = [
  {
    path: "",
    canActivate: [CmsPageGuards],
    component: HomePageComponent
  },
  {
    path: "cart",
    canActivate: [CmsPageGuards],
    component: CartPageComponent
  },
  {
    path: "search/:query",
    component: ProductListPageComponent
  },
  {
    path: "product/:productCode",
    canActivate: [CmsPageGuards],
    component: ProductDetailPageComponent
  },

  // redirect OLD links
  {
    path: "Open-Catalogue/:categoryTitle/c/:categoryCode",
    redirectTo: "/category/:categoryCode/:categoryTitle"
  },
  {
    path: "Open-Catalogue/:category1/:categoryTitle/c/:categoryCode",
    redirectTo: "/category/:categoryCode/:categoryTitle"
  },
  {
    path: "Open-Catalogue/:category1/:category2/:categoryTitle/c/:categoryCode",
    redirectTo: "/category/:categoryCode/:categoryTitle"
  },
  {
    path: "OpenCatalogue/:category1/:category2/:categoryTitle/c/:categoryCode",
    redirectTo: "/category/:categoryCode/:categoryTitle"
  },

  {
    path: "category/:categoryCode",
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent
  },
  {
    path: "category/:categoryCode/:title",
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent
  },

  {
    path: "brand/:brandCode",
    component: CategoryPageComponent
  },
  {
    path: "brand/:brandCode/:title",
    component: CategoryPageComponent
  },

  {
    path: "**",
    component: PageNotFoundComponent
  }
];
