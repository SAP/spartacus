import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(protected fb: FormBuilder, protected router: Router) {}

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
   *
   * @param formConfiguration an Angular's form configuration object based
   * on which to create the form
   * @param defaultValue used to patch the newly created form
   * @param key to associate the form with
   * @returns the form
   */
  get<T extends AbstractControl>(
    formConfiguration: { [key: string]: any },
    key: string,
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
   *
   * @param key for which to remove the form
   * @returns `true` if the removal was successful.
   */
  remove(key: string): boolean {
    return this.forms.delete(key);
  }

  /**
   * Returns `true` if a form is stored under the given `key`.
   *
   * @param key for which to check if the form exists
   * @returns `true` if the form exists, `false` otherwise
   */
  has(key: string): boolean {
    return this.forms.has(key);
  }

  /**
   * Generates a key based on the current route.
   *
   * @returns a key based on the current route
   */
  // TODO:#persistence - check if base site is part of the URL? if not, add at least the base site
  generateKey(): string {
    console.log('this.router.url: ', this.router.url);

    return this.router.url;
  }

  /**
   * Uses the provided unique `key` to persist the given `form`.
   *
   * @param key for which to associate the provided `form`
   * @param form the form to store
   */
  protected set<T extends AbstractControl>(key: string, form: T): void {
    this.forms.set(key, form);
  }

  /**
   * Creates the form for the provided `formConfiguration` using `FormBuilder`.
   *
   * @param formConfiguration an Angular's form configuration object
   * @returns the created form
   */
  protected createForm(formConfiguration: { [key: string]: any }): FormGroup {
    return this.fb.group(formConfiguration);
  }
}
