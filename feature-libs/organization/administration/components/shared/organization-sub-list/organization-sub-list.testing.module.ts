import { Component, Input, NgModule } from '@angular/core';
import { OrganizationListService } from '../organization-list/organization-list.service';

@Component({
  selector: 'cx-organization-sub-list',
  template: '',
})
class MockOrganizationSubListComponent {
  @Input() i18nRoot;
}

class MockOrganizationListService {}

@NgModule({
  declarations: [MockOrganizationSubListComponent],
  exports: [MockOrganizationSubListComponent],
  providers: [
    {
      provide: OrganizationListService,
      useClass: MockOrganizationListService,
    },
  ],
})
export class OrganizationSubListTestingModule {}
