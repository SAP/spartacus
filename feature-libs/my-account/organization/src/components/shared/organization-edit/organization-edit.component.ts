import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { CurrentOrganizationItemService } from '../current-organization-item.service';
import { OrganizationFormService } from './organization-form.service';

@Component({
  selector: 'cx-organization-edit',
  templateUrl: './organization-edit.component.html',
})
export class OrganizationEditComponent<T> {
  @Input() i18nRoot: string;

  i18n: string;

  form$: Observable<FormGroup> = this.currentItemService.b2bUnit$.pipe(
    switchMap((unitUid) => {
      return this.currentItemService.item$.pipe(
        map((item) => {
          this.setI18nRoot(item);
          if (!item) {
            // TODO: as long as we do not have harmonized unit property, we have to workaround here,
            item = { orgUnit: { uid: unitUid } } as any;
          }
          return this.formService.getForm(item);
        })
      );
    })
  );

  constructor(
    protected currentItemService: CurrentOrganizationItemService<T>,
    protected formService: OrganizationFormService<T>
  ) {}

  save(form: FormGroup): void {
    this.currentItemService.key$.pipe(first()).subscribe((key) => {
      this.currentItemService.save(form, key);
    });
  }

  protected setI18nRoot(item) {
    // concatenate the i18n root with .edit or .create suffix
    this.i18n = this.i18nRoot + (item ? '.edit' : '.create');
  }
}
