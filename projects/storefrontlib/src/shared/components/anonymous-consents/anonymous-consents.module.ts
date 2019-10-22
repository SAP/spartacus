import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { AnonymousConsentDialogComponent } from './dialog/anonymous-consent-dialog.component';
import { AnonymousConsentFormComponent } from './dialog/form/anonymous-consent-form.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  declarations: [
    AnonymousConsentDialogComponent,
    AnonymousConsentFormComponent,
  ],
  entryComponents: [AnonymousConsentDialogComponent],
  exports: [AnonymousConsentDialogComponent, AnonymousConsentFormComponent],
})
export class AnonymousConsentsModule {}
