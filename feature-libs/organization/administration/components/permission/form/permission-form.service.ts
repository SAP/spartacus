import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Permission } from '@spartacus/organization/administration/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { FormService } from '../../shared/form/form.service';

export enum PermissionType {
  ORDER = 'B2BOrderThresholdPermission',
  TIME_SPAN = 'B2BOrderThresholdTimespanPermission',
  EXCEEDED = 'B2BBudgetExceededPermission',
}
@Injectable({
  providedIn: 'root',
})
export class PermissionFormService
  extends FormService<Permission>
  implements OnDestroy
{
  protected subscription = new Subscription();

  /**
   * @override
   * Builds a generic sub form for permissions and amends the form
   * based on the for approval permission type.
   */
  protected build() {
    const form = new FormGroup({});
    form.setControl(
      'code',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.noSpecialCharacters,
      ])
    );
    form.setControl(
      'orgUnit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );

    form.setControl(
      'orderApprovalPermissionType',
      new FormGroup({
        code: new FormControl(undefined, Validators.required),
      })
    );

    // subscribe to permission type changes and amend accordingly.
    this.subscription.add(
      form
        .get('orderApprovalPermissionType')
        .get('code')
        .valueChanges.pipe(
          distinctUntilChanged(),
          filter((code) => !!code)
        )
        .subscribe((code) => this.amend(form, code))
    );

    this.form = form;
  }

  /**
   * @override
   * The form is using  `B2BBudgetExceededPermission` by default.
   */
  get defaultValue(): Permission {
    return {
      orderApprovalPermissionType: {
        code: PermissionType.EXCEEDED,
      },
    };
  }

  /**
   * Amends the form structure based on the `PermissionType`.
   */
  protected amend(form: FormGroup, code: PermissionType) {
    if (code === PermissionType.EXCEEDED) {
      form.removeControl('periodRange');
      form.removeControl('currency');
      form.removeControl('threshold');
    }

    if (code === PermissionType.TIME_SPAN || code === PermissionType.ORDER) {
      if (!form.get('currency')) {
        form.setControl(
          'currency',
          new FormGroup({
            isocode: new FormControl(undefined, Validators.required),
          })
        );
      }
      if (!form.get('threshold')) {
        form.setControl('threshold', new FormControl('', Validators.required));
      }
    }

    if (code === PermissionType.ORDER) {
      form.removeControl('periodRange');
    }

    if (code === PermissionType.TIME_SPAN) {
      if (!form.get('periodRange')) {
        form.setControl(
          'periodRange',
          new FormControl('', Validators.required)
        );
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  protected patchData(item?) {
    super.patchData(item);
    if (item?.code !== undefined) {
      this.form.get('orderApprovalPermissionType').disable();
    }
  }
}
