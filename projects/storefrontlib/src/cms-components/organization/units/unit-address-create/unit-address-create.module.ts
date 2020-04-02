import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { UnitAddressCreateComponent } from './unit-address-create.component';
import { UnitFormModule } from '../unit-form/unit-form.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UnitCreateComponent: {
          component: UnitAddressCreateComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UnitFormModule,
    I18nModule,
  ],
  declarations: [UnitAddressCreateComponent],
  exports: [UnitAddressCreateComponent],
  entryComponents: [UnitAddressCreateComponent],
})
export class UnitAddressCreateModule {}
