import { Component, Input, OnDestroy } from '@angular/core';
import { LoadStatus } from '@spartacus/organization/administration/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, first, take } from 'rxjs/operators';
import { ItemService } from '../../item.service';
import { ConfirmationMessageComponent } from '../../message/confirmation/confirmation-message.component';
import { ConfirmationMessageData } from '../../message/confirmation/confirmation-message.model';
import { MessageService } from '../../message/services/message.service';
import { BaseItem } from '../../organization.model';

/**
 * Reusable component in the my-company is to delete an item (if it's possible)
 */
@Component({
  selector: 'cx-org-delete-item',
  templateUrl: './delete-item.component.html',
  host: { class: 'content-wrapper' },
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

  /**
   * The additionalParam input can be used to provide additional data if it's required
   * for API request
   */
  @Input() additionalParam?: string;

  /**
   * resolves the current item.
   */
  current$: Observable<T> = this.itemService.current$;

  /**
   * resolves if the user is currently in the edit form.
   */
  isInEditMode$: Observable<boolean> = this.itemService.isInEditMode$;

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
          params: { item },
        },
        messageTitle: {
          key: this.i18nRoot + '.messages.deleteTitle',
          params: { item },
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
      .subscribe((data) => this.notify({ ...item, ...data.item }));
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
