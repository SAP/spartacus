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

@NgModule({
  imports: [
    CommonModule,
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
