import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { ConsentManagementFormComponent } from './components/consent-form/consent-management-form.component';
import { ConsentManagementListComponent } from './components/consent-list/consent-management-list.component';
import { ConsentManagementComponent } from './components/consent-management.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ConsentManagementComponent: { selector: 'cx-consent-management' },
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
  ],
  declarations: [
    ConsentManagementComponent,
    ConsentManagementListComponent,
    ConsentManagementFormComponent,
  ],
  exports: [ConsentManagementComponent],
  entryComponents: [ConsentManagementComponent],
})
export class ConsentManagementModule {}
