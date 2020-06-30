import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { UnitChildrenComponent } from './unit-children.component';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { Table2Module } from '../../../../shared/components/table/table2.module';
import { FakeTabsModule } from '../../fake-tabs/fake-tabs.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orgUnitChildren' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UnitChildrenComponent: {
          component: UnitChildrenComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    Table2Module,
    FakeTabsModule,
  ],
  declarations: [UnitChildrenComponent],
  exports: [UnitChildrenComponent],
  entryComponents: [UnitChildrenComponent],
})
export class UnitChildrenModule {}
