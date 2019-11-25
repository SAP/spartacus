import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProfileTagCmsModule } from './cms-components/profile-tag-cms.module';
import { ConsentReferenceInterceptor } from './http-interceptors/consent-reference-interceptor';
import { DebugInterceptor } from './http-interceptors/debug-interceptor';

@NgModule({
  imports: [ProfileTagCmsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ConsentReferenceInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: DebugInterceptor, multi: true },
  ],
})
export class ProfileTagModule {}
