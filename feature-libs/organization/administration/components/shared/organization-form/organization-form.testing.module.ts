import { Component, Input, NgModule } from '@angular/core';
import { CurrentOrganizationItemService } from '../current-organization-item.service';
import { OrganizationFormService } from './organization-form.service';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-organization-form',
  template: '<ng-content></ng-content>',
})
class MockOrganizationFormComponent {
  @Input() i18nRoot;
}

export class MockBudgetFormService {}

class MockCurrentOrganizationItemService {}
class MockOrganizationFormService {
  getForm = createSpy('getForm');
}

@NgModule({
  declarations: [MockOrganizationFormComponent],
  exports: [MockOrganizationFormComponent],
  providers: [
    {
      provide: CurrentOrganizationItemService,
      useExisting: MockCurrentOrganizationItemService,
    },
    {
      provide: OrganizationFormService,
      useExisting: MockOrganizationFormService,
    },
  ],
})
export class OrganizationFormTestingModule {}
