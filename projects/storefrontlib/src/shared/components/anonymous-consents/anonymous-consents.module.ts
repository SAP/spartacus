import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { AnonymousConsentsDialogComponent } from './dialog/anonymous-consents-dialog.component';
import { AnonymousConsentsComponent } from './dialog/anonymous-consents.component';
import { AnonymousConsentFormComponent } from './dialog/form/anonymous-consent-form.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  declarations: [
    AnonymousConsentsComponent,
    AnonymousConsentsDialogComponent,
    AnonymousConsentFormComponent,
  ],
  entryComponents: [
    AnonymousConsentsComponent,
    AnonymousConsentsDialogComponent,
  ],
  exports: [
    AnonymousConsentsComponent,
    AnonymousConsentsDialogComponent,
    AnonymousConsentFormComponent,
  ],
})
export class AnonymousConsentsModule {}
