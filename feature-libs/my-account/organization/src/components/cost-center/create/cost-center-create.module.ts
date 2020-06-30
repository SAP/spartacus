import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { CostCenterFormModule } from '../form/cost-center-form.module';
import { CostCenterCreateComponent } from './cost-center-create.component';

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
