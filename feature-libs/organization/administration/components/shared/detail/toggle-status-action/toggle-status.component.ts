import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { LoadStatus } from '@spartacus/organization/administration/core';
import { Subject, Subscription } from 'rxjs';
import { filter, first, take } from 'rxjs/operators';
import { OrganizationItemService } from '../../organization-item.service';
import { ConfirmationMessageComponent } from '../../message/confirmation/confirmation-message.component';
import { ConfirmationMessageData } from '../../message/confirmation/confirmation-message.model';
import { MessageService } from '../../message/services/message.service';
import { BaseItem } from '../../organization.model';

/**
 * Reusable component in the my-company are to toggle the disabled state for
 * my company entities.
 */
@Component({
  selector: 'cx-org-toggle-status',
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
  current$ = this.itemService.current$;

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
    return (
      this.disabled ??
      !(item.orgUnit || (item as any).unit || (item as any).parentOrgUnit)
        ?.active
    );
  }

  protected update(item: T): void {
    this.itemService
      .update(item[this.key], this.getPatchedItem(item))
      .pipe(
        take(1),
        filter((data) => data.status === LoadStatus.SUCCESS)
      )
      .subscribe((data) => this.notify({ ...item, ...data.item }));
  }

  protected getPatchedItem(item: T): T {
    const patch: BaseItem = {};
    patch[this.key] = item[this.key];
    patch.active = !item.active;
    return patch as T;
  }

  protected notify(item: T) {
    this.messageService.add({
      message: {
        key: `${this.i18nRoot}.messages.${
          item.active ? 'confirmEnabled' : 'confirmDisabled'
        }`,
        params: { item },
      },
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
