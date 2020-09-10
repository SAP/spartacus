import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { first, tap } from 'rxjs/operators';
import { OrganizationItemService } from '../../organization-item.service';
import { MessageComponentData } from '../../organization-message/message.model';
import { BaseItem } from '../../organization.model';
import { PromptMessageComponent } from './prompt/prompt.component';
import { PromptMessageService } from './prompt/prompt.message.service';
import { MessagePromptData } from './prompt/prompt.model';

@Component({
  selector: 'cx-toggle-status',
  templateUrl: './toggle-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleStatusComponent<T extends BaseItem> implements OnInit {
  @Input() i18nRoot;

  protected item: T;

  current$ = this.itemService.current$.pipe(
    tap((current) => (this.item = current))
  );

  constructor(
    protected itemService: OrganizationItemService<T>,
    protected messageService: PromptMessageService
  ) {}

  ngOnInit() {
    this.messageService.confirm.subscribe((data: MessagePromptData<T>) => {
      if (this.item === data.item) {
        this.messageService.clear();
        this.update(data.item);
      }
    });
  }

  toggleActive(item: T) {
    this.messageService.clear();

    if (item.active) {
      this.messageService.add<MessagePromptData<T>>(
        {
          message: {
            key: this.i18nRoot + '.messages.deactivate',
          },
          type: GlobalMessageType.MSG_TYPE_INFO,
          item: item,
        },
        PromptMessageComponent
      );
    } else {
      this.update(item);
    }
  }

  isDisabled(item): boolean {
    if (item.orgUnit) {
      return !item.orgUnit?.active;
    }
    if (item.unit) {
      return !item.unit;
    }
  }

  protected update(model: T): void {
    const item: T = { ...model };
    if ((model as any).type === 'b2BCostCenterWsDTO') {
      (item as any).activeFlag = !model.active;
    } else {
      item.active = !model.active;
    }
    this.itemService.update(item.code ?? item['uid'], item);
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
