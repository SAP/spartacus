import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
  UserService,
} from '@spartacus/core';
import { BootstrapModule } from '../../../../lib/bootstrap.module';
import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { OrderHistoryComponent } from './order-history.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderHistoryComponent: { selector: 'cx-order-history' },
      },
    }),
    RouterModule,
    FormsModule,
    NgSelectModule,
    BootstrapModule,
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
