import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideConfig } from '@spartacus/core';
import {
  // TODO:#anon - check this one
  ConsentManagementModule,
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { AnonymousConsentDialogComponent } from './anonymous-consent-dialog.component';
import { defaultAnonymousConsentLayoutConfig } from './default-anonymous-consent-layout.config';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    SpinnerModule,
    ConsentManagementModule,
    KeyboardFocusModule,
  ],
  providers: [provideConfig(defaultAnonymousConsentLayoutConfig)],
  declarations: [AnonymousConsentDialogComponent],
  exports: [AnonymousConsentDialogComponent],
})
export class AnonymousConsentsDialogModule {}
