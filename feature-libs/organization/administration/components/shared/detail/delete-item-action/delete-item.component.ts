import { Component, Input, OnDestroy } from '@angular/core';
import { LoadStatus } from '@spartacus/organization/administration/core';
import { Subject, Subscription } from 'rxjs';
import { filter, first, take } from 'rxjs/operators';
import { ItemService } from '../../item.service';
import { ConfirmationMessageComponent } from '../../message/confirmation/confirmation-message.component';
import { ConfirmationMessageData } from '../../message/confirmation/confirmation-message.model';
import { MessageService } from '../../message/services/message.service';
import { BaseItem } from '../../organization.model';

/**
 * Reusable component in the my-company are to toggle the disabled state for
 * my company entities.
 */
@Component({
  selector: 'cx-org-delete-item',
  templateUrl: './delete-item.component.html',
})
export class DeleteItemComponent<T extends BaseItem> implements OnDestroy {
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
  @Input() additionalParam?: string;

  /**
   * The disabled state is calculated but can be provided as well.
   */
  /**
   * resolves the current item.
   */
  current$ = this.itemService.current$;

  /**
   * resolves if the user is currently in the edit form.
   */
  isInEditMode$ = this.itemService.isInEditMode$;

  protected subscription = new Subscription();
  protected confirmation: Subject<ConfirmationMessageData>;

  constructor(
    protected itemService: ItemService<T>,
    protected messageService: MessageService<ConfirmationMessageData>
  ) {}

  delete(item: T) {
    if (!this.confirmation) {
      this.confirmation = this.messageService.add({
        message: {
          key: this.i18nRoot + '.messages.delete',
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
            this.confirmDelete(item);
            this.confirmation = null;
          }
        })
      );
    }
  }

  protected confirmDelete(item: T): void {
    this.itemService
      .delete(item[this.key], this.additionalParam)
      .pipe(
        take(1),
        filter((data) => data.status === LoadStatus.SUCCESS)
      )
      .subscribe((data) => this.notify({ ...item, ...data.item })); // TODO: redirect
  }

  protected notify(item: T) {
    this.messageService.add({
      message: {
        key: `${this.i18nRoot}.messages.deleted`,
        params: { item },
      },
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
