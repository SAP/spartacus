/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { BaseItem } from '../organization.model';

@Injectable()
export abstract class FormService<T> {
  protected form: UntypedFormGroup | null;

  /**
   * Builds the form structure.
   */
  protected abstract build(item?: T): void;

  getForm(item?: T): UntypedFormGroup | null {
    if (this.form && !!item) {
      this.patchData(item);
      return this.form;
    }

    if (!this.form) {
      this.build(item);
    }

    // while we should be able to reset with initial value, this doesn't always work
    // hence, we're patching afterwards.
    this.form?.reset();

    this.form?.enable();
    this.patchData(item);
    return this.form;
  }

  protected patchData(item?: T): void {
    this.toggleFreeze(item);
    this.form?.patchValue({ ...this.defaultValue, ...item });
  }

  private toggleFreeze(item?: T): void {
    if (this.form?.enabled && (item as BaseItem)?.active === false) {
      this.form.disable();
    }
    if (this.form?.disabled && (item as BaseItem)?.active === true) {
      this.form.enable();
    }
  }
  /**
   * returns the default form value.
   */
  protected get defaultValue(): T {
    return {} as T;
  }
}
