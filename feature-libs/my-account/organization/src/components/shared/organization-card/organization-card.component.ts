import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ViewComponent } from '@spartacus/storefront';
import { OrganizationItemService } from '../organization-item.service';

@Component({
  selector: 'cx-organization-card',
  templateUrl: './organization-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationCardComponent<T> {
  @Input() i18nRoot: string;
  @Input() previous: boolean | string = true;

  item$ = this.itemService.current$;

  constructor(protected itemService: OrganizationItemService<T>) {}

  closeView(view: ViewComponent, event: MouseEvent) {
    event.stopPropagation();
    view.toggle(true);

    setTimeout(() => {
      (event.target as HTMLElement).parentElement.click();
    }, 500);

    return false;
  }
}
