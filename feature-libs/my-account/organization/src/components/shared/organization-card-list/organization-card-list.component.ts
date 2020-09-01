import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListComponent } from '../organization-list/organization-list.component';

@Component({
  selector: 'cx-organization-card-list',
  templateUrl: './organization-card-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationCardListComponent extends OrganizationListComponent {
  title$ = this.currentService.getTitle();
}
