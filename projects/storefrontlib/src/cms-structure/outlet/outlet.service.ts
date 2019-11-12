import { ComponentFactory, Injectable, TemplateRef } from '@angular/core';
import { OutletPosition } from './outlet.model';

@Injectable({
  providedIn: 'root',
})
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
    position?: OutletPosition
  ): void;
  /**
   * @param templateOrFactory A `ComponentFactory` that inserts a component dynamically.
   */
  add(
    outlet: string,
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
    }
  }

  get(
    outlet: string,
    position: OutletPosition = OutletPosition.REPLACE
  ): TemplateRef<any> | ComponentFactory<any> {
    let templateRef;
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
    return templateRef;
  }
}
