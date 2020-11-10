import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { ViewComponent } from '@spartacus/storefront';
import { tap } from 'rxjs/operators';
import { OrganizationItemService } from '../organization-item.service';
import { MessageService } from '../organization-message/services/message.service';
import { BaseItem } from '../organization.model';

@Component({
  selector: 'cx-organization-card',
  templateUrl: './organization-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [MessageService],
})
export class OrganizationCardComponent<T extends BaseItem> {
  @Input() i18nRoot: string;
  @Input() previous: boolean | string = true;

  protected itemKey;

  item$ = this.itemService.current$.pipe(
    tap((item) => this.refreshMessages(item))
  );

  @ViewChild(ViewComponent, { read: ViewComponent }) view: ViewComponent;

  constructor(
    protected itemService: OrganizationItemService<T>,
    protected messageService: MessageService
  ) {}

  /**
   * The views are router based, which means if we close a view, the router outlet is
   * cleaned immediately. To prevent this, we're closing the view manually, before
   * navigating back.
   */
  closeView(event: MouseEvent) {
    event.stopPropagation();
    this.view.toggle(true);

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
