import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { CostCenterCreateComponent } from './cost-center-create.component';
import { CostCenterFormModule } from '../cost-center-form/cost-center-form.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CostCenterCreateComponent: {
          component: CostCenterCreateComponent,
          guards: [AuthGuard],
        },
      },
    }),
    CostCenterFormModule,
    I18nModule,
  ],
  declarations: [CostCenterCreateComponent],
  exports: [CostCenterCreateComponent],
  entryComponents: [CostCenterCreateComponent],
})
export class CostCenterCreateModule {}
