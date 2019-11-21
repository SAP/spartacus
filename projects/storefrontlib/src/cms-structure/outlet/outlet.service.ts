<<<<<<< HEAD
import { ComponentFactory, Injectable, TemplateRef } from '@angular/core';
import { OutletPosition } from './outlet.model';
=======
import { Injectable, TemplateRef } from '@angular/core';
import { AVOID_STACKED_OUTLETS, OutletPosition } from './outlet.model';
>>>>>>> b2e807aa4f4e18d7b83dc1883bee1d7745616fb2

@Injectable({
  providedIn: 'root',
})
<<<<<<< HEAD
export class OutletService {
  private templatesRefs = new Map<
    string,
    TemplateRef<any> | ComponentFactory<any>
  >();
  private templatesRefsBefore = new Map<
    string,
    TemplateRef<any> | ComponentFactory<any>
  >();
  private templatesRefsAfter = new Map<
    string,
    TemplateRef<any> | ComponentFactory<any>
  >();
=======
export class OutletService<T = TemplateRef<any>> {
  private templatesRefs = new Map<string, (T)[]>();
  private templatesRefsBefore = new Map<string, (T)[]>();
  private templatesRefsAfter = new Map<string, (T)[]>();
>>>>>>> b2e807aa4f4e18d7b83dc1883bee1d7745616fb2

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
<<<<<<< HEAD
  add(
    outlet: string,
    template: TemplateRef<any>,
    position?: OutletPosition
  ): void;
  /**
   * @param factory The `ComponentFactory` that will be dynamically added to the outlet UI
   */
  add(
    outlet: string,
    // tslint:disable-next-line: unified-signatures
    factory: ComponentFactory<any>,
=======
  add(outlet: string, template: T, position?: OutletPosition): void;
  /**
   * @param factory The `ComponentFactory` that will be dynamically added to the outlet UI
   */
  add(
    outlet: string,
    // tslint:disable-next-line: unified-signatures
    factory: T,
>>>>>>> b2e807aa4f4e18d7b83dc1883bee1d7745616fb2
    position?: OutletPosition
  ): void;
  /**
   * @param templateOrFactory A `ComponentFactory` that inserts a component dynamically.
   */
  add(
    outlet: string,
<<<<<<< HEAD
    templateOrFactory: TemplateRef<any> | ComponentFactory<any>,
    position: OutletPosition = OutletPosition.REPLACE
  ): void {
    if (position === OutletPosition.BEFORE) {
      this.templatesRefsBefore.set(outlet, templateOrFactory);
    }
    if (position === OutletPosition.REPLACE) {
      this.templatesRefs.set(outlet, templateOrFactory);
    }
    if (position === OutletPosition.AFTER) {
      this.templatesRefsAfter.set(outlet, templateOrFactory);
=======
    templateOrFactory: T,
    position: OutletPosition = OutletPosition.REPLACE
  ): void {
    if (position === OutletPosition.BEFORE) {
      this.store(this.templatesRefsBefore, outlet, templateOrFactory);
    }
    if (position === OutletPosition.REPLACE) {
      this.store(this.templatesRefs, outlet, templateOrFactory);
    }
    if (position === OutletPosition.AFTER) {
      this.store(this.templatesRefsAfter, outlet, templateOrFactory);
>>>>>>> b2e807aa4f4e18d7b83dc1883bee1d7745616fb2
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
<<<<<<< HEAD
    position: OutletPosition = OutletPosition.REPLACE
  ): TemplateRef<any> | ComponentFactory<any> {
    let templateRef;
=======
    position: OutletPosition = OutletPosition.REPLACE,
    stacked = AVOID_STACKED_OUTLETS
  ): T[] | T {
    let templateRef: T[];
>>>>>>> b2e807aa4f4e18d7b83dc1883bee1d7745616fb2
    switch (position) {
      case OutletPosition.BEFORE:
        templateRef = this.templatesRefsBefore.get(outlet);
        break;
      case OutletPosition.AFTER:
        templateRef = this.templatesRefsAfter.get(outlet);
        break;
      default:
        templateRef = this.templatesRefs.get(outlet);
<<<<<<< HEAD
    }
    return templateRef;
=======
    }
    if (templateRef && !stacked) {
      return templateRef[0];
    }
    return templateRef;
  }

  private store(store: Map<string, (T)[]>, outlet: string, value: T) {
    const existing = store.get(outlet) || [];
    const newValue: T[] = existing.concat([value]);
    store.set(outlet, newValue);
>>>>>>> b2e807aa4f4e18d7b83dc1883bee1d7745616fb2
  }
}
