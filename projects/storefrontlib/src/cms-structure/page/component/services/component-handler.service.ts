import {
  ComponentRef,
  ElementRef,
  Inject,
  Injectable,
  Injector,
  isDevMode,
  NgModuleRef,
  Optional,
  ViewContainerRef,
} from '@angular/core';
import { ComponentHandler } from '../handlers/component-handler';
import { CmsComponentMapping, resolveApplicable } from '@spartacus/core';
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
    const handler = resolveApplicable(this.handlers, [componentMapping]);

    if (isDevMode() && !handler) {
      if (!this.invalidMappings.has(componentMapping)) {
        this.invalidMappings.add(componentMapping);
        console.warn(
          "Can't resolve handler for component mapping: ",
          componentMapping
        );
      }
    }

    return handler;
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
    elementInjector?: Injector,
    module?: NgModuleRef<any>
  ): Observable<{ elementRef: ElementRef; componentRef?: ComponentRef<any> }> {
    return this.resolve(componentMapping)?.launcher(
      componentMapping,
      viewContainerRef,
      elementInjector,
      module
    );
  }
}
