import { Routes, RouterModule} from '@angular/router';

import { HomePageComponent } from '../ui/templates/home-page/home-page.component';
import { CardPageComponent } from '../ui/templates/card-page/card-page.component';
import { ProductDetailPageComponent } from '../ui/templates/product-detail-page/product-detail-page.component';
import { ProductListPageComponent } from '../ui/templates/product-list-page/product-list-page.component';
import { CategoryPageComponent } from '../ui/templates/category-page/category-page.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'card',
        component: CardPageComponent
    },
    {
        path: 'myaccount',
        component: CardPageComponent
    },


    {path: 'search/:query', component: ProductListPageComponent},
    {path: 'product/:productCode', component: ProductDetailPageComponent},

    {path: 'category/:categoryCode', component: CategoryPageComponent},
    {path: 'category/:categoryCode/:title', component: CategoryPageComponent},

    {path: 'brand/:brandCode', component: CategoryPageComponent},
    {path: 'brand/:brandCode/:title', component: CategoryPageComponent},
];

export const AppRouter = RouterModule.forRoot(appRoutes);
