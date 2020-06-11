import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';

/**
 * This service handles storing the reactive forms.
 * It uses the internal `Map` as a storage.
 */
@Injectable({ providedIn: 'root' })
export class FormsPersistenceService {
  /**
   * An internal map that contains stored reactive forms.
   */
  private forms = new Map<object, AbstractControl>();

  constructor(protected fb: FormBuilder) {}

  /**
   * The method will use the provided `key` to lookup the persisted form.
   * If it exists, the stored form is returned.
   *
   * If the form is _not_ found, the method will create the `FormGroup`
   * using the provided `formConfiguration`, and patch the form using
   * the provided `defaultValue`. The created and patched form will be
   * stored by calling the `this.set()` method.
   */
  get<T extends AbstractControl>(
    key: object,
    formConfiguration: { [key: string]: any },
    //TODO:#save-forms - make optional? if making this change, change the API comment above as well
    defaultValue: object
  ): T {
    const form = this.forms.get(key);
    if (form) {
      return <T>form;
    }

    const fg = this.fb.group(formConfiguration);
    //TODO:#save-forms - setValue vs. patch?
    fg.patchValue(defaultValue);

    this.set(key, fg);
    return <T>(<unknown>fg);
  }

  /**
   * Removes the form associated with the provided `key`.
   * Returns `true` if the removal was successful.
   */
  remove(key: object): boolean {
    return this.forms.delete(key);
  }

  /**
   * Uses the provided unique `key` to persist the given `form`.
   */
  protected set<T extends AbstractControl>(key: object, form: T): void {
    this.forms.set(key, form);
  }
}
