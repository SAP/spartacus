import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * This service handles the persistence of forms.
 * It uses the internal `Map` as a persisting storage.
 *
 * The service can be extended in order to provide other
 * persisting storages, such as `localStorage`, `indexDB`, etc.
 */
@Injectable({ providedIn: 'root' })
export class FormsPersistenceService {
  /**
   * An internal map containing the stream of the reactive form.
   */
  private forms = new Map<string, FormGroup>();

  constructor(protected fb: FormBuilder) {}

  /**
   * The method will use the provided `key` to lookup the persisted form.
   * If the form is not found, the method will call `this.set()` and
   * persist the `defaultForm` value.
   *
   * If the `prePopulatedFormData` paramter is set, its value is used
   * to pre-populate the form. This is typically done when editing an entity.
   */
  //TODO:#save-forms - api param comments
  get(
    key: string,
    formConfiguration: { [key: string]: any },
    defaultValue: object
  ): FormGroup {
    console.log('map: ', this.forms);
    const form = this.forms.get(key);
    if (form) {
      return form;
    }

    //TODO:#save-forms - if we use generics, what to use here?
    const fg = this.fb.group(formConfiguration);
    //TODO:#save-forms - setValue vs. patch?
    fg.patchValue(defaultValue);

    this.set(key, fg);
    return fg;
  }

  /**
   * Removes the form associated with the provided `key`.
   * Returns `true` if the removal was successful.
   */
  //TODO:#save-forms - api param comments
  remove(key: string): boolean {
    return this.forms.delete(key);
  }

  //TODO:#save-forms - api comments
  //TODO:#save-forms - support for Observable<string> for key?
  has(key: string): boolean {
    return this.forms.has(key);
  }

  /**
   * Uses the provided unique `key` to persist the stream of the given `form`.
   */
  //TODO:#save-forms - api param comments
  protected set(key: string, fg: FormGroup): void {
    this.forms.set(key, fg);
  }
}
