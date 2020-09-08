import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { Subject } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { OrganizationItemService } from '../../organization-item.service';
import { MessageService } from '../../organization-message';
import { MessageComponentData } from '../../organization-message/message.model';
import { BaseItem } from '../../organization.model';
import { PromptMessageComponent } from './prompt/prompt.component';
import { MessagePromptData } from './prompt/prompt.model';

@Component({
  selector: 'cx-toggle-status',
  templateUrl: './toggle-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleStatusComponent<T extends BaseItem> {
  @Input() i18nRoot;

  protected item: T;

  current$ = this.itemService.current$.pipe(
    tap((current) => (this.item = current))
  );

  constructor(
    protected itemService: OrganizationItemService<T>,
    protected messageService: MessageService
  ) {}

  toggleActive(item: T) {
    this.messageService.clear();

    if (item.active) {
      const prompt = new Subject<boolean>();
      prompt.subscribe(() => {
        this.messageService.clear();
        this.update(item);
      });

      this.messageService.add<MessagePromptData<T>>(
        {
          message: {
            key: this.i18nRoot + '.messages.deactivate',
          },
          type: GlobalMessageType.MSG_TYPE_INFO,
          item: item,
          confirm: prompt,
        },
        PromptMessageComponent
      );
    } else {
      this.update(item);
    }
  }

  /**
   * Indicates whether the status can be toggled or not.
   */
  isDisabled(item): boolean {
    return !(item.orgUnit || item.unit)?.active;
  }

  protected update(model: T): void {
    const item: T = { ...model };
    if ((model as any).type === 'b2BCostCenterWsDTO') {
      (item as any).activeFlag = !model.active;
    } else {
      item.active = !model.active;
    }
    this.itemService.update(item.code, item);
    this.confirmMessage(item);
  }

  protected confirmMessage(model: T): void {
    this.messageService.clear();
    this.current$
      .pipe(first((update) => update.active === model.active))
      .subscribe((update) => {
        this.messageService.add<MessageComponentData>({
          message: {
            key: update.active
              ? this.i18nRoot + '.messages.confirmEnabled'
              : this.i18nRoot + '.messages.confirmDisabled',
          },
          type: GlobalMessageType.MSG_TYPE_INFO,
        });
      });
  }
}
