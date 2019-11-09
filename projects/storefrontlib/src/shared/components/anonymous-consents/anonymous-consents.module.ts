import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { ConsentManagementModule } from '../../../cms-components/myaccount/consent-management/consent-management.module';
import { AnonymousConsentDialogComponent } from './dialog/anonymous-consent-dialog.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, ConsentManagementModule],
  declarations: [AnonymousConsentDialogComponent],
  entryComponents: [AnonymousConsentDialogComponent],
  exports: [AnonymousConsentDialogComponent],
})
export class AnonymousConsentsModule {}
