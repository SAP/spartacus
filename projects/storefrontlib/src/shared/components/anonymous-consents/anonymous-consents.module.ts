import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { ConsentManagementModule } from '../../../cms-components/myaccount/consent-management/consent-management.module';
import { AnonymousConsentsDialogComponent } from './dialog/anonymous-consents-dialog.component';
import { AnonymousConsentFormComponent } from './dialog/form/anonymous-consent-form.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, ConsentManagementModule],
  declarations: [
    AnonymousConsentsDialogComponent,
    AnonymousConsentFormComponent,
  ],
  entryComponents: [AnonymousConsentsDialogComponent],
  exports: [AnonymousConsentsDialogComponent, AnonymousConsentFormComponent],
})
export class AnonymousConsentsModule {}
