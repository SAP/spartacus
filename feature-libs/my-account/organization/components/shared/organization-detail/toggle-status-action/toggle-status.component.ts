import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { tap } from 'rxjs/operators';
import { OrganizationItemService } from '../../organization-item.service';
import { MessageService } from '../../organization-message/services/message.service';
import { BaseItem } from '../../organization.model';
import { PromptMessageComponent } from './prompt/prompt.component';
import { MessageConfirmationData } from './prompt/prompt.model';

/**
 * Reusable component in the my-company are to toggle the disabled state for
 * my company entities.
 */
@Component({
  selector: 'cx-toggle-status',
  templateUrl: './toggle-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleStatusComponent<T extends BaseItem> implements OnDestroy {
  /**
   * The localization of messages is based on the i18n root. Messages are
   * concatenated to the root, such as:
   *
   * `[i18nRoot].messages.deactivate`
   */
  @Input() i18nRoot: string;

  /**
   * The key input can be used to add a custom key.
   *
   * Most _organization_ entities use the `code` key, but there is some variations.
   */
  @Input() key = 'code';

  /**
   * The disabled state is calculated but can be provided as well.
   */
  @Input() disabled: boolean;

  /**
   * resolves the current item.
   */
  current$ = this.itemService.current$.pipe(tap((item) => this.notify(item)));

  protected itemActiveState: boolean;

  private subscription;

  constructor(
    protected itemService: OrganizationItemService<T>,
    protected messageService: MessageService
  ) {}

  toggle(item: T) {
    if (!item.active) {
      // we do ask for confirmation when the entity gets activated
      this.update(item);
    } else {
      const confirmation = this.messageService.add<MessageConfirmationData>({
        message: {
          key: this.i18nRoot + '.messages.deactivate',
        },
        component: PromptMessageComponent,
      });

      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      this.subscription = confirmation.subscribe((event) => {
        if (event.confirm) {
          this.messageService.close(confirmation);
          this.update(item);
        }
      });
    }
  }

  /**
   * Indicates whether the status can be toggled or not.
   */
  isDisabled(item: T): boolean {
    return this.disabled ?? !(item.orgUnit || (item as any).unit)?.active;
  }

  protected update(item: T): void {
    this.itemService.update(item[this.key], this.getPatchedItem(item));
  }

  protected getPatchedItem(item: T): T {
    const patch: BaseItem = {};
    if ((item as any).type === 'b2BCostCenterWsDTO') {
      (patch as any).activeFlag = !item.active;
    } else {
      patch.active = !item.active;
    }
    patch[this.key] = item[this.key];
    return patch as T;
  }

  protected notify(item: T) {
    if (this.isChanged(item)) {
      this.messageService.add({
        message: {
          key: item.active
            ? this.i18nRoot + '.messages.confirmDisabled'
            : this.i18nRoot + '.messages.confirmEnabled',
          params: {
            item: item,
          },
        },
      });
    }
    this.itemActiveState = item.active;
  }

  protected isChanged(item: T) {
    return (
      this.itemActiveState !== undefined && item.active !== this.itemActiveState
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
