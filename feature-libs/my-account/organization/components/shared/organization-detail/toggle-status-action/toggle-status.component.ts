import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { OrganizationItemService } from '../../organization-item.service';
import { ConfirmationMessageComponent } from '../../organization-message/confirmation/confirmation-message.component';
import { ConfirmationMessageData } from '../../organization-message/confirmation/confirmation-message.model';
import { MessageService } from '../../organization-message/services/message.service';
import { BaseItem } from '../../organization.model';

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

  protected itemActiveState: T;

  protected subscription = new Subscription();
  protected confirmation: Subject<ConfirmationMessageData>;

  constructor(
    protected itemService: OrganizationItemService<T>,
    protected messageService: MessageService<ConfirmationMessageData>
  ) {}

  toggle(item: T) {
    if (!item.active) {
      // we do ask for confirmation when the entity gets activated
      this.update(item);
    } else {
      if (!this.confirmation) {
        this.confirmation = this.messageService.add({
          message: {
            key: this.i18nRoot + '.messages.deactivate',
          },
          component: ConfirmationMessageComponent,
        });

        this.subscription.add(
          this.confirmation.pipe(first()).subscribe((event) => {
            if (event.close) {
              this.confirmation = null;
            }
            if (event.confirm) {
              this.messageService.close(this.confirmation);
              this.update(item);
              this.confirmation = null;
            }
          })
        );
      }
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
    patch[this.key] = item[this.key];
    patch.active = !item.active;
    // active flag is used still by cost center
    (patch as any).activeFlag = !item.active;
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
    this.itemActiveState = { ...item };
  }

  protected isChanged(item: T) {
    return (
      this.itemActiveState &&
      item[this.key] === this.itemActiveState[this.key] &&
      item.active !== this.itemActiveState.active
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
