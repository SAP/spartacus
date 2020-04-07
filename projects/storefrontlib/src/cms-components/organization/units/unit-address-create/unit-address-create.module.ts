import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { UnitAddressCreateComponent } from './unit-address-create.component';
import { UnitAddressFormModule } from '../unit-address-form/unit-address-form.module';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orgUnitAddressCreate' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UnitAddressCreateComponent: {
          component: UnitAddressCreateComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UnitAddressFormModule,
    I18nModule,
  ],
  declarations: [UnitAddressCreateComponent],
  exports: [UnitAddressCreateComponent],
  entryComponents: [UnitAddressCreateComponent],
})
export class UnitAddressCreateModule {}
