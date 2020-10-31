import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap, take } from 'rxjs/operators';
import { OrganizationCardComponent } from '../organization-card/organization-card.component';
import { OrganizationItemService } from '../organization-item.service';
import { MessageService } from '../organization-message/services/message.service';
import { LoadStatus } from '@spartacus/organization/administration/core';

/**
 * Reusable component for creating and editing organization items. The component does not
 * know anything about form specific.
 */
@Component({
  selector: 'cx-organization-form',
  templateUrl: './organization-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationFormComponent<T> {
  /**
   * i18n root for all localizations. The i18n root key is suffixed with
   * either `.edit` or `.create`, depending on the usage of the component.
   */
  @Input() i18nRoot: string;

  @Input() animateBack = true;

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

  constructor(
    protected itemService: OrganizationItemService<T>,
    protected messageService: MessageService
  ) {}

  save(form: FormGroup): void {
    this.itemService.key$
      .pipe(
        first(),
        switchMap((key) =>
          this.itemService.save(form, key).pipe(
            take(1),
            filter((data) => data.status === LoadStatus.SUCCESS),
            map((data) => ({
              item: data.item,
              action: key ? 'update' : 'create',
            }))
          )
        )
      )
      .subscribe(({ item, action }) => this.notify(item, action));
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

  back(event: MouseEvent, card: OrganizationCardComponent<any>) {
    if (this.animateBack) {
      card.closeView(event);
    }
  }
}
