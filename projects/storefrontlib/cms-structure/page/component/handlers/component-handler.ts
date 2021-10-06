import {
  ComponentRef,
  ElementRef,
  Injector,
  NgModuleRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Applicable, CmsComponentMapping, Priority } from '@spartacus/core';

/**
 * ComponentHandler implementations can be used for instantiating and launching
 * different types of CMS mapped components
 */
export abstract class ComponentHandler implements Applicable {
  /**
   * Returns component resource - an observable stream used to launch and dispose
   * component.
   *
   * Instantiate and launch component by subscribing to launcher.
   * Successful component launch will be followed by emission of ElementRef
   * (and in case of native Angular component, also ComponentRef).
   * Unsubscribing from the launcher will remove and tear down the component.
   *
   * @param componentMapping
   * @param viewContainerRef
   * @param elementInjector
   * @param module
   */
  abstract launcher(
    componentMapping: CmsComponentMapping,
    viewContainerRef: ViewContainerRef,
    elementInjector?: Injector,
    module?: NgModuleRef<any>
  ): Observable<{ elementRef: ElementRef; componentRef?: ComponentRef<any> }>;

  abstract hasMatch(componentMapping: CmsComponentMapping): boolean;
  abstract getPriority?(): Priority;
}
