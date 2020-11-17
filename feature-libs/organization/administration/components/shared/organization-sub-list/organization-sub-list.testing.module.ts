import { Component, Input, NgModule } from '@angular/core';
import { ListService } from '../list/list.service';

@Component({
  selector: 'cx-org-sub-list',
  template: '',
})
class MockOrganizationSubListComponent {
  @Input() i18nRoot;
}

class MockListService {}

@NgModule({
  declarations: [MockOrganizationSubListComponent],
  exports: [MockOrganizationSubListComponent],
  providers: [
    {
      provide: ListService,
      useClass: MockListService,
    },
  ],
})
export class OrganizationSubListTestingModule {}
