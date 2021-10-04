import { ComponentFactory, Injectable, TemplateRef } from '@angular/core';
import { AVOID_STACKED_OUTLETS, OutletPosition } from './outlet.model';

@Injectable({
  providedIn: 'root',
})
export class OutletService<T = TemplateRef<any> | ComponentFactory<any>> {
  private templatesRefs = {
    [OutletPosition.BEFORE]: new Map<string, T[]>(),
    [OutletPosition.REPLACE]: new Map<string, T[]>(),
    [OutletPosition.AFTER]: new Map<string, T[]>(),
  };

  /**
   * Adds a template or ComponentFactory, so that UI outlets can be replaced dynamically.
   * The UI position where this template or ComponentFactory is inserted is given by a
   * string reference (called `outlet`) and optional `OutletPosition`. The `OutletPosition`
   * is either before or after, or replaces the entire UI.
   *
   * @param outlet the UI location represented by a string
   * @param template the `TemplateRef` that will be used to insert UI
   * @param position the `OutletPosition` in the UI
   */
  add(outlet: string, template: T, position?: OutletPosition): void;
  /**
   * @param factory The `ComponentFactory` that will be dynamically added to the outlet UI
   */
  add(
    outlet: string,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    factory: T,
    position?: OutletPosition
  ): void;
  /**
   * @param templateOrFactory A `ComponentFactory` that inserts a component dynamically.
   */
  add(
    outlet: string,
    templateOrFactory: T,
    position: OutletPosition = OutletPosition.REPLACE
  ): void {
    const store = this.templatesRefs[position];
    if (store) {
      const existing = store.get(outlet) || [];
      const newValue: T[] = existing.concat([templateOrFactory]);
      store.set(outlet, newValue);
    }
  }

  /**
   *
   * Returns a single object or multiple objects for the given outlet reference,
   * depending on the `stacked` argument.
   *
   * @param outlet The outlet reference
   * @param position the outlet position, `OutletPosition.before`, `OutletPosition.AFTER` or `OutletPosition.REPLACE`
   * @param stacked Indicates whether an array of outlet components is returned
   */
  get(
    outlet: string,
    position: OutletPosition = OutletPosition.REPLACE,
    stacked = AVOID_STACKED_OUTLETS
  ): T[] | T {
    const store =
      this.templatesRefs[position] ||
      this.templatesRefs[OutletPosition.REPLACE];

    const templateRef: T[] = store.get(outlet);
    if (templateRef && !stacked) {
      return templateRef[0];
    }
    return templateRef;
  }

  remove(
    outlet: string,
    position: OutletPosition = OutletPosition.REPLACE,
    value?: T
  ): void {
    const store =
      this.templatesRefs[position] ||
      this.templatesRefs[OutletPosition.REPLACE];

    this.removeValueOrAll(store, outlet, value);
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

      existing = existing.filter((val) => val !== value);

      store.set(outlet, existing);
    }
  }
}
