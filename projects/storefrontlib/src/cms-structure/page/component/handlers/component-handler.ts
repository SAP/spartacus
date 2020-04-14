import {
  ComponentRef,
  ElementRef,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CmsComponentMapping, Handler, Priority } from '@spartacus/core';

export abstract class ComponentHandler implements Handler {
  abstract launcher(
    componentMapping: CmsComponentMapping,
    viewContainerRef: ViewContainerRef,
    elementInjector?: Injector
  ): Observable<[ElementRef, ComponentRef<any>?]>;

  abstract hasMatch(componentMapping: CmsComponentMapping): boolean;
  abstract getPriority?(): Priority;
}
