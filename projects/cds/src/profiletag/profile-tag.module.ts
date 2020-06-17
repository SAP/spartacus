import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CdsBackendNotificationAdapter } from './adapters/cds-backend-notification-adapter';
import { OccBackendNotification } from './adapters/occ-backend-notification-adapter';
import { ProfileTagCmsModule } from './cms-components/profile-tag-cms.module';
import { ConsentReferenceInterceptor } from './http-interceptors/consent-reference-interceptor';
import { DebugInterceptor } from './http-interceptors/debug-interceptor';
import { ProfileTagLifecycle } from './model/profile-tag-lifecycle';
import { ProfileTagLifecycleService } from './services/profile-tag-lifecycle.service';

@NgModule({
  imports: [ProfileTagCmsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: ConsentReferenceInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useExisting: DebugInterceptor, multi: true },
    {
      provide: CdsBackendNotificationAdapter,
      useClass: OccBackendNotification,
    },
    {
      provide: ProfileTagLifecycle,
      useClass: ProfileTagLifecycleService,
    },
  ],
})
export class ProfileTagModule {}
