import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { IconModule } from '../../misc/icon/icon.module';
import { ConsentManagementFormComponent } from './components/consent-form/consent-management-form.component';
import { ConsentManagementComponent } from './components/consent-management.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
    IconModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ConsentManagementComponent: {
          component: ConsentManagementComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [ConsentManagementComponent, ConsentManagementFormComponent],
  exports: [ConsentManagementComponent, ConsentManagementFormComponent],
  entryComponents: [ConsentManagementComponent],
})
export class ConsentManagementModule {}
