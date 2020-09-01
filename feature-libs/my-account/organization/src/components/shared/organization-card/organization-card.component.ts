import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListComponent } from '../organization-list/organization-list.component';

@Component({
  selector: 'cx-organization-card',
  templateUrl: './organization-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationCardComponent extends OrganizationListComponent {
  title$ = this.currentService.getTitle();
}
