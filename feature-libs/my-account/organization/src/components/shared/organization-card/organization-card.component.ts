import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ViewComponent } from '@spartacus/storefront';
import { OrganizationListComponent } from '../organization-list/organization-list.component';

@Component({
  selector: 'cx-organization-card',
  templateUrl: './organization-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationCardComponent extends OrganizationListComponent {
  @Input() i18nRoot: string;
  @Input() previous: boolean | string = true;

  item$ = this.currentService.item$;

  closeView(view: ViewComponent, event: MouseEvent) {
    event.stopPropagation();
    view.toggle(true);

    setTimeout(() => {
      (event.target as HTMLElement).parentElement.click();
    }, 500);

    return false;
  }
}
