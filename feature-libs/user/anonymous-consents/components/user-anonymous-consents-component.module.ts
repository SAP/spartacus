import { NgModule } from '@angular/core';
import { AnonymousConsentManagementBannerModule } from './banner/anonymous-consent-management-banner.module';
import { AnonymousConsentsDialogModule } from './dialog/anonymous-consents-dialog.module';
import { AnonymousConsentOpenDialogModule } from './open-dialog/anonymous-consent-open-dialog.module';

@NgModule({
  imports: [
    AnonymousConsentsDialogModule,
    AnonymousConsentManagementBannerModule,
    AnonymousConsentOpenDialogModule,
  ],
})
export class UserAnonymousConsentsComponentsModule {}
