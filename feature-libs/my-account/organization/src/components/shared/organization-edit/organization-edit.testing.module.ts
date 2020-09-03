import { Component, Input, NgModule } from '@angular/core';
import { CurrentOrganizationItemService } from '../current-organization-item.service';
import { OrganizationFormService } from './organization-form.service';

@Component({
  selector: 'cx-organization-edit',
  template: '<ng-content></ng-content>',
})
class MockOrganizationEditComponent {
  @Input() i18nRoot;
}

class MockCurrentOrganizationItemService {}
class MockOrganizationFormService {}

@NgModule({
  declarations: [MockOrganizationEditComponent],
  exports: [MockOrganizationEditComponent],
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
export class OrganizationEditTestingModule {}
