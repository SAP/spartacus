import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
  UserService,
} from '@spartacus/core';
import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { OrderHistoryComponent } from './order-history.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orders' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderHistoryComponent: {
          component: OrderHistoryComponent,
          guards: [AuthGuard],
        },
      },
    }),
    RouterModule,
    FormsModule,
    NgSelectModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
  ],
  declarations: [OrderHistoryComponent],
  exports: [OrderHistoryComponent],
  providers: [UserService],
  entryComponents: [OrderHistoryComponent],
})
export class OrderHistoryModule {}
