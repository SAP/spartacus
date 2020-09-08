import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ViewComponent } from '@spartacus/storefront';
import { tap } from 'rxjs/operators';
import { OrganizationItemService } from '../organization-item.service';
import { MessageService } from '../organization-message/services/message.service';
import { BaseItem } from '../organization.model';

@Component({
  selector: 'cx-organization-card',
  templateUrl: './organization-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MessageService, useClass: MessageService }],
})
export class OrganizationCardComponent<T extends BaseItem> {
  @Input() i18nRoot: string;
  @Input() previous: boolean | string = true;

  protected itemKey;

  item$ = this.itemService.current$.pipe(
    tap((item) => this.refreshMessages(item))
  );

  constructor(
    protected itemService: OrganizationItemService<T>,
    protected messageService: MessageService
  ) {}

  closeView(view: ViewComponent, event: MouseEvent) {
    event.stopPropagation();
    view.toggle(true);

    setTimeout(() => {
      (event.target as HTMLElement)?.parentElement.click();
    }, 500);

    return false;
  }

  get previousLabel(): string {
    return this.previous as string;
  }

  protected refreshMessages(item: T) {
    if (item?.code !== this.itemKey) {
      this.messageService.clear();
    }
    this.itemKey = item?.code;
  }
}
