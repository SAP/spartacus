import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationLinkComponent } from '../organization-link.component';

@Component({
  template: `
    <a
      [routerLink]="{ cxRoute: route, params: routeModel } | cxUrl"
      [class.is-active]="isActive"
    >
      <span class="text"> {{ property | cxTranslate }}</span>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent extends OrganizationLinkComponent<any> {
  get property() {
    return this.isActive ? 'organization.enabled' : 'organization.disabled';
  }

  get isActive(): boolean {
    return this.model.active;
  }
}
