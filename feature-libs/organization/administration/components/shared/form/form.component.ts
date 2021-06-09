import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoadStatus } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { first, map, switchMap, take } from 'rxjs/operators';
import { CardComponent } from '../card/card.component';
import { ItemService } from '../item.service';
import { MessageService } from '../message/services/message.service';

const DISABLED_STATUS = 'DISABLED';

/**
 * Reusable component for creating and editing organization items. The component does not
 * know anything about form specific.
 */
@Component({
  selector: 'cx-org-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
})
export class FormComponent<T> implements OnInit, OnDestroy {
  /**
   * i18n root for all localizations. The i18n root key is suffixed with
   * either `.edit` or `.create`, depending on the usage of the component.
   */
  @Input() i18nRoot: string;

  @Input() animateBack = true;
  @Input() subtitle?: string;

  /**
   * i18n key for the localizations.
   */
  i18n: string;

  form$: Observable<FormGroup> = this.itemService.current$.pipe(
    map((item) => {
      this.setI18nRoot(item);

      if (!item) {
        // we trick the form builder...
        item = {} as any;
      }
      return this.itemService.getForm(item);
    })
  );

  /**
   * To handle the case of receiving a negative response during creation an item
   */
  disabled$ = this.form$.pipe(
    switchMap((form) => form.statusChanges),
    map((status) => status === DISABLED_STATUS)
  );

  constructor(
    protected itemService: ItemService<T>,
    protected messageService: MessageService
  ) {}

  save(form: FormGroup): void {
    this.itemService.key$
      .pipe(
        first(),
        switchMap((key) =>
          this.itemService.save(form, key).pipe(
            take(1),
            map((data) => ({
              item: data.item,
              status: data.status,
              action: key ? 'update' : 'create',
            }))
          )
        )
      )
      .subscribe(({ item, action, status }) => {
        if (status === LoadStatus.SUCCESS) {
          this.itemService.launchDetails(item);
          this.notify(item, action);
        }
        form.enable();
      });
  }

  protected notify(item: T, action: string) {
    this.messageService.add({
      message: {
        key: `${this.i18nRoot}.messages.${action}`,
        params: {
          item,
        },
      },
    });
  }

  protected setI18nRoot(item: T): void {
    // concatenate the i18n root with .edit or .create suffix
    this.i18n = this.i18nRoot + (item ? '.edit' : '.create');
  }

  back(event: MouseEvent, card: CardComponent<any>) {
    if (this.animateBack) {
      card.closeView(event);
    }
  }

  ngOnInit() {
    this.itemService.setEditMode(true);
  }

  ngOnDestroy() {
    this.itemService.setEditMode(false);
  }
}
