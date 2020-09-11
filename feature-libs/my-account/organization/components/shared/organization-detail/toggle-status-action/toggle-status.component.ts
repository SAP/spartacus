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
  /**
   * The localization of messages is based on the i18n root. Messages are
   * concatenated to the root, such as:
   *
   * `[i18nRoot].messages.deactivate`
   */
  @Input() i18nRoot: string;

  /**
   * While most _organization_ entities use the `code` key, we have some variations. The key input
   * can be used to add a custom key.
   */
  @Input() key = 'code';

  /**
   * The disabled state is calculated by default but can be provided as well.
   */
  @Input() disabled: boolean;

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
      prompt.pipe(first()).subscribe(() => {
        this.messageService.clear();
        this.update(item);
      });

      this.messageService.add<MessagePromptData<T>>(
        {
          message: {
            key: this.i18nRoot + '.messages.deactivate',
          },
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
    return this.disabled ?? !(item.orgUnit || item.unit)?.active;
  }

  protected update(model: T): void {
    this.itemService.update(model[this.key], this.getPatchedModel(model));
    this.confirmMessage(model);
  }

  protected getPatchedModel(model: T): T {
    const patch: BaseItem = {};
    if ((model as any).type === 'b2BCostCenterWsDTO') {
      (patch as any).activeFlag = !model.active;
    } else {
      patch.active = !model.active;
    }
    patch[this.key] = model[this.key];
    return patch as T;
  }

  protected confirmMessage(model: T): void {
    this.messageService.clear();
    this.current$
      .pipe(first((update) => update.active === model.active))
      .subscribe((update) => {
        this.messageService.add<MessageComponentData>({
          message: {
            key: update.active
              ? this.i18nRoot + '.messages.confirmDisabled'
              : this.i18nRoot + '.messages.confirmEnabled',
            params: {
              item: model,
            },
          },
          type: GlobalMessageType.MSG_TYPE_INFO,
        });
      });
  }
}
