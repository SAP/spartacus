import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { UnitAddressEditComponent } from './unit-address-edit.component';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { UnitAddressFormModule } from '../unit-address-form/unit-address-form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orgUnitAddressEdit' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UnitAddressEditComponent: {
          component: UnitAddressEditComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UnitAddressFormModule,
    I18nModule,
  ],
  declarations: [UnitAddressEditComponent],
  exports: [UnitAddressEditComponent],
  entryComponents: [UnitAddressEditComponent],
})
export class UnitAddressEditModule {}
