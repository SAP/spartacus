import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  CxDatePipe,
  I18nModule,
  UserService,
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
  providers: [UserService, CxDatePipe],
  entryComponents: [CostCenterCreateComponent],
})
export class CostCenterCreateModule {}
