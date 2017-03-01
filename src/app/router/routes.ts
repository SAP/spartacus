import { Routes, RouterModule} from '@angular/router';

import { HomePageComponent } from '../ui/templates/home-page/home-page.component';
import { CardPageComponent } from '../ui/templates/card-page/card-page.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent
        // children: [
        //     {
        //         path: 'card',
        //         component: CardPageComponent
        //     }
        // ]
    },
    {
        path: 'card',
        component: CardPageComponent
    },
    {
        path: 'myaccount',
        component: CardPageComponent
    }
];

export const AppRouter = RouterModule.forRoot(appRoutes);
