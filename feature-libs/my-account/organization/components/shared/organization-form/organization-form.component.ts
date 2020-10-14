import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { OrganizationItemService } from '../organization-item.service';

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

  constructor(protected itemService: OrganizationItemService<T>) {}

  save(form: FormGroup): void {
    this.itemService.key$.pipe(first()).subscribe((key) => {
      this.itemService.save(form, key);
    });
  }

  protected setI18nRoot(item: T): void {
    // concatenate the i18n root with .edit or .create suffix
    this.i18n = this.i18nRoot + (item ? '.edit' : '.create');
  }
}
