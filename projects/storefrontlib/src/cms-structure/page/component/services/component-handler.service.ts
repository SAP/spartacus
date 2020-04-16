import {
  ComponentRef,
  ElementRef,
  Inject,
  Injectable,
  Injector,
  isDevMode,
  Optional,
  ViewContainerRef,
} from '@angular/core';
import { ComponentHandler } from '../handlers/component-handler';
import { CmsComponentMapping } from '@spartacus/core';
import { Observable } from 'rxjs';

/**
 * Responsible for obtaining component handler for specified component mapping
 */
@Injectable({
  providedIn: 'root',
})
export class ComponentHandlerService {
  constructor(
    @Optional()
    @Inject(ComponentHandler)
    protected handlers: ComponentHandler[]
  ) {}

  protected invalidMappings = new Set<CmsComponentMapping>();

  /**
   * Get best matching component handler
   *
   * @param componentMapping
   */
  protected resolve(componentMapping: CmsComponentMapping): ComponentHandler {
    const matchedHandlers = (this.handlers ?? []).filter((handler) =>
      handler.hasMatch(componentMapping)
    );
    if (matchedHandlers.length > 1) {
      matchedHandlers.sort(
        (a, b) =>
          (a.getPriority ? a.getPriority() : 0) -
          (b.getPriority ? b.getPriority() : 0)
      );
    }
    if (isDevMode() && matchedHandlers.length === 0) {
      if (!this.invalidMappings.has(componentMapping)) {
        this.invalidMappings.add(componentMapping);
        console.warn(
          "Can't resolve handler for component mapping: ",
          componentMapping
        );
      }
    }
    return matchedHandlers[matchedHandlers.length - 1];
  }

  /**
   * Get launcher for specified component mapping
   *
   * @param componentMapping
   * @param viewContainerRef
   * @param elementInjector
   */
  getLauncher(
    componentMapping: CmsComponentMapping,
    viewContainerRef: ViewContainerRef,
    elementInjector?: Injector
  ): Observable<{ elementRef: ElementRef; componentRef?: ComponentRef<any> }> {
    return this.resolve(componentMapping)?.launcher(
      componentMapping,
      viewContainerRef,
      elementInjector
    );
  }
}
