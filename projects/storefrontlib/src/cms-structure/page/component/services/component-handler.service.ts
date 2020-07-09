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
import {
  CmsComponentMapping,
  logger,
  resolveApplicable,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { ComponentHandler } from '../handlers/component-handler';

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
        logger.warn(
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
    elementInjector?: Injector
  ): Observable<{ elementRef: ElementRef; componentRef?: ComponentRef<any> }> {
    return this.resolve(componentMapping)?.launcher(
      componentMapping,
      viewContainerRef,
      elementInjector
    );
  }
}
