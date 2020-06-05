import { Injectable, TemplateRef } from '@angular/core';
import {
  AVOID_STACKED_OUTLETS,
  OutletPosition,
  USE_STACKED_OUTLETS,
} from './outlet.model';

@Injectable({
  providedIn: 'root',
})
export class OutletService<T = TemplateRef<any>> {
  private templatesRefs = new Map<string, T[]>();
  private templatesRefsBefore = new Map<string, T[]>();
  private templatesRefsAfter = new Map<string, T[]>();

  /**
   * Adds a template or ComponentFactory, so that UI outlets can be replaced dynamically.
   * The UI position where this template or ComponentFactory is inserted is given by a
   * string reference (called `outlet`) and optional `OutletPosition`. The `OutletPosition`
   * is either before or after, or replaces the entire UI.
   *
   * @param outlet the UI location represented by a string
   * @param template the `TemplateRef` that will be used to insert UI
   * @param position the `OutletPosition` in the UI
   * @param stackable Indicates whether the template should be stacked on an already registered template
   */
  add(
    outlet: string,
    templateOrFactory: T,
    position: OutletPosition = OutletPosition.REPLACE,
    stackable = USE_STACKED_OUTLETS
  ): void {
    if (position === OutletPosition.BEFORE) {
      this.store(
        this.templatesRefsBefore,
        outlet,
        templateOrFactory,
        stackable
      );
    }
    if (position === OutletPosition.REPLACE) {
      this.store(this.templatesRefs, outlet, templateOrFactory, stackable);
    }
    if (position === OutletPosition.AFTER) {
      this.store(this.templatesRefsAfter, outlet, templateOrFactory, stackable);
    }
  }

  /**
   *
   * Returns a single object or multiple objects for the given outlet reference,
   * depending on the `stacked` argument.
   *
   * @param outlet The outlet reference
   * @param position the outlet position, `OutletPosition.before`, `OutletPosition.AFTER` or `OutletPosition.REPLACE`
   * @param stackable Indicates whether an array of outlet components is returned
   */
  get(
    outlet: string,
    position: OutletPosition = OutletPosition.REPLACE,
    stackable = AVOID_STACKED_OUTLETS
  ): T[] | T {
    let templateRef: T[];
    switch (position) {
      case OutletPosition.BEFORE:
        templateRef = this.templatesRefsBefore.get(outlet);
        break;
      case OutletPosition.AFTER:
        templateRef = this.templatesRefsAfter.get(outlet);
        break;
      default:
        templateRef = this.templatesRefs.get(outlet);
    }
    if (templateRef && !stackable) {
      return templateRef[0];
    }
    return templateRef;
  }

  remove(
    outlet: string,
    position: OutletPosition = OutletPosition.REPLACE,
    value?: T
  ): void {
    switch (position) {
      case OutletPosition.BEFORE:
        this.removeValueOrAll(this.templatesRefsBefore, outlet, value);
        break;
      case OutletPosition.AFTER:
        this.removeValueOrAll(this.templatesRefsAfter, outlet, value);
        break;
      default:
        this.removeValueOrAll(this.templatesRefs, outlet, value);
    }
  }

  protected store(
    store: Map<string, T[]>,
    outlet: string,
    value: T,
    stackable: boolean
  ) {
    const existing = store.get(outlet) || [];
    if (stackable || existing.length === 0) {
      const newValue: T[] = existing.concat([value]);
      store.set(outlet, newValue);
    }
  }

  protected removeValueOrAll(
    store: Map<string, T[]>,
    outlet: string,
    value?: T
  ): void {
    if (!value && store.has(outlet)) {
      store.delete(outlet);
    } else if (value && store.has(outlet)) {
      let existing = store.get(outlet);
      existing = existing.filter((val) => val === value);
      store.set(outlet, existing);
    }
  }
}
