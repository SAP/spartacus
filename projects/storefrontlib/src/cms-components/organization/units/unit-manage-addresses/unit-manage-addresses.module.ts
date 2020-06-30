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
import { Table2Module } from '../../../../shared/components/table/table.module';
import { FakeTabsModule } from '../../fake-tabs/fake-tabs.module';

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
    Table2Module,
    FakeTabsModule,
  ],
  declarations: [UnitManageAddressesComponent],
  exports: [UnitManageAddressesComponent],
  providers: [],
  entryComponents: [UnitManageAddressesComponent],
})
export class UnitManageAddressesModule {}
