import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { ConsentManagementModule } from '../../../cms-components/myaccount/consent-management/consent-management.module';
import { SpinnerModule } from '../spinner/spinner.module';
import { AnonymousConsentDialogComponent } from './dialog/anonymous-consent-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    SpinnerModule,
    ConsentManagementModule,
  ],
  declarations: [AnonymousConsentDialogComponent],
  entryComponents: [AnonymousConsentDialogComponent],
  exports: [AnonymousConsentDialogComponent],
})
export class AnonymousConsentsModule {}
