import { Component, Input, NgModule } from '@angular/core';
import { CurrentOrganizationItemService } from '../current-organization-item.service';
import { FormService } from './form.service';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-org-form',
  template: '<ng-content></ng-content>',
})
class MockFormComponent {
  @Input() i18nRoot;
}

export class MockBudgetFormService {}

class MockCurrentOrganizationItemService {}
class MockFormService {
  getForm = createSpy('getForm');
}

@NgModule({
  declarations: [MockFormComponent],
  exports: [MockFormComponent],
  providers: [
    {
      provide: CurrentOrganizationItemService,
      useExisting: MockCurrentOrganizationItemService,
    },
    {
      provide: FormService,
      useExisting: MockFormService,
    },
  ],
})
export class FormTestingModule {}
