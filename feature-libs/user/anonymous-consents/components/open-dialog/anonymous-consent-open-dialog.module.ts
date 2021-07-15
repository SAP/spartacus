import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { AnonymousConsentOpenDialogComponent } from './anonymous-consent-open-dialog.component';

@NgModule({
  imports: [CommonModule, I18nModule, KeyboardFocusModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AnonymousConsentOpenDialogComponent: {
          component: AnonymousConsentOpenDialogComponent,
        },
      },
    }),
  ],
  declarations: [AnonymousConsentOpenDialogComponent],
  exports: [AnonymousConsentOpenDialogComponent],
})
export class AnonymousConsentOpenDialogModule {}
