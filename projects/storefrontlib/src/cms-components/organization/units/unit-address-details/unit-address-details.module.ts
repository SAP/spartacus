import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { UnitAddressDetailsComponent } from './unit-address-details.component';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orgUnitAddressDetails' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UnitAddressDetailsComponent: {
          component: UnitAddressDetailsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
  ],
  declarations: [UnitAddressDetailsComponent],
  exports: [UnitAddressDetailsComponent],
  entryComponents: [UnitAddressDetailsComponent],
})
export class UnitAddressDetailsModule {}
