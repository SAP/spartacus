import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ViewComponent } from '@spartacus/storefront';
import { tap } from 'rxjs/operators';
import { PromptMessageService } from '../organization-detail/toggle-status-action/prompt/prompt.message.service';
import { OrganizationItemService } from '../organization-item.service';
import { MessageService } from '../organization-message/services/message.service';

@Component({
  selector: 'cx-organization-card',
  templateUrl: './organization-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MessageService,
      useExisting: PromptMessageService,
    },
  ],
})
export class OrganizationCardComponent<T> {
  @Input() i18nRoot: string;
  @Input() previous: boolean | string = true;

  item$ = this.itemService.current$.pipe(
    tap(() => this.messageService.clear())
  );

  constructor(
    protected itemService: OrganizationItemService<T>,
    protected messageService: MessageService
  ) {}

  closeView(view: ViewComponent, event: MouseEvent) {
    event.stopPropagation();
    view.toggle(true);

    setTimeout(() => {
      (event.target as HTMLElement).parentElement.click();
    }, 500);

    return false;
  }

  get previousLabel(): string {
    return this.previous as string;
  }
}
