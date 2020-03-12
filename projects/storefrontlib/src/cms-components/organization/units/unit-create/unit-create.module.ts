import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { UnitCreateComponent } from './unit-create.component';
import { UnitFormModule } from '../unit-form/unit-form.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UnitCreateComponent: {
          component: UnitCreateComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UnitFormModule,
    I18nModule,
  ],
  declarations: [UnitCreateComponent],
  exports: [UnitCreateComponent],
  entryComponents: [UnitCreateComponent],
})
export class UnitCreateModule {}
