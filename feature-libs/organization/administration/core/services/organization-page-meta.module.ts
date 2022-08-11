import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { OrganizationPageMetaResolver } from './organization-page-meta.resolver';

@NgModule({
  providers: [
    {
      provide: PageMetaResolver,
      useExisting: OrganizationPageMetaResolver,
      multi: true,
    },
  ],
})
export class OrganizationPageMetaModule {}
