import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrganizationListComponent } from '../organization-list/organization-list.component';

@Component({
  selector: 'cx-organization-card',
  templateUrl: './organization-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationCardComponent extends OrganizationListComponent {
  @Input() i18NRoot: string;
  @Input() previous: boolean | string = true;

  item$ = this.currentService.item$;
}
