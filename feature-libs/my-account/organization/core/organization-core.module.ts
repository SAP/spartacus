import { NgModule } from '@angular/core';
import { OrganizationPageMetaModule } from './services/organization-page-meta.module';
import { OrganizationStoreModule } from './store/organization-store.module';
@NgModule({
  imports: [OrganizationPageMetaModule, OrganizationStoreModule],
})
export class OrganizationCoreModule {}
