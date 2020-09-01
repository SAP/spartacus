import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrganizationListComponent } from '../organization-list/organization-list.component';

@Component({
  selector: 'cx-organization-card',
  templateUrl: './organization-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationCardComponent extends OrganizationListComponent {
  @Input() previous = true;

  title$ = this.currentService.getTitle();
}
