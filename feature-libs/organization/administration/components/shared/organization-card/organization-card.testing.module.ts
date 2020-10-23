import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'cx-organization-card',
  template: '<ng-content></ng-content>',
})
class MockOrganizationCardComponent {
  @Input() i18nRoot;
  @Input() previous;
}

@NgModule({
  declarations: [MockOrganizationCardComponent],
  exports: [MockOrganizationCardComponent],
})
export class OrganizationCardTestingModule {}
