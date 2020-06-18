import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

/**
 * This service handles storing the reactive forms.
 * It uses the internal `Map` as a storage.
 */
@Injectable({ providedIn: 'root' })
export class FormsPersistenceService {
  /**
   * An internal map that contains stored reactive forms.
   */
  private forms = new Map<string, AbstractControl>();

  constructor(protected fb: FormBuilder) {}

  /**
   * The method will use the provided `key` to lookup the persisted form.
   * If the provided key is falsy, the method will just create the form
   * and return it, without storing it.
   *
   * If the form already exists for the provided `key`, it is returned.
   *
   * If the form is _not_ found, the method will create the `FormGroup`
   * using the provided `formConfiguration`, and patch the form if the
   * `defaultValue` is provided. The created form will be stored by
   * calling the `this.set()` method.
   */
  get<T extends AbstractControl>(
    key: string,
    formConfiguration: { [key: string]: any },
    defaultValue?: object
  ): T {
    if (!key) {
      return <T>(<unknown>this.createForm(formConfiguration));
    }

    if (this.has(key)) {
      return <T>this.forms.get(key);
    }

    const fg = this.createForm(formConfiguration);
    if (defaultValue) {
      fg.patchValue(defaultValue);
    }

    this.set(key, fg);
    return <T>(<unknown>fg);
  }

  /**
   * Removes the form associated with the provided `key`.
   * Returns `true` if the removal was successful.
   */
  remove(key: string): boolean {
    return this.forms.delete(key);
  }

  /**
   * Returns `true` if a form is stored under the given `key`.
   */
  has(key: string): boolean {
    return this.forms.has(key);
  }

  /**
   * Uses the provided unique `key` to persist the given `form`.
   */
  protected set<T extends AbstractControl>(key: string, form: T): void {
    this.forms.set(key, form);
  }

  /**
   * Creates the form for the provided `formConfiguration` using `FormBuilder`.
   */
  protected createForm(formConfiguration: { [key: string]: any }): FormGroup {
    return this.fb.group(formConfiguration);
  }
}
