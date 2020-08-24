import { Component } from '@angular/core';
import { Budget } from '@spartacus/my-account';
import { OrganizationLinkComponent } from 'feature-libs/my-account/organization/src/components/shared/property-renderers/organization-link.component';

@Component({
  template: ` {{ model.name }} `,
})
export class TestComponent extends OrganizationLinkComponent<Budget> {}
