import { ComponentRef, ElementRef, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { CmsComponentMapping, Handler, Priority } from '@spartacus/core';

export abstract class ComponentHandler implements Handler {
  abstract launcher(
    componentType: string,
    uid: string,
    directiveInjector: Injector
  ): Observable<[ElementRef, ComponentRef<any>?]>;

  abstract hasMatch(componentMapping: CmsComponentMapping): boolean;
  abstract getPriority?(): Priority;
}
