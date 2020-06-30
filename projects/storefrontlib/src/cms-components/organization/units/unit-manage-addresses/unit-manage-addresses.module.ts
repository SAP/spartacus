import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { UnitManageAddressesComponent } from './unit-manage-addresses.component';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { TableModule } from '../../../../shared/components/table/table.module';
import { FakeTabsModule } from '../../fake-tabs/fake-tabs.module';
import { ConfirmModalModule } from './../../../../shared/components/modal/confirm-modal/confirm-modal.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orgUnitManageAddresses' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UnitManageAddressesComponent: {
          component: UnitManageAddressesComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    NgSelectModule,
    FormsModule,
    TableModule,
    FakeTabsModule,
    ConfirmModalModule,
  ],
  declarations: [UnitManageAddressesComponent],
  exports: [UnitManageAddressesComponent],
  entryComponents: [UnitManageAddressesComponent],
})
export class UnitManageAddressesModule {}
