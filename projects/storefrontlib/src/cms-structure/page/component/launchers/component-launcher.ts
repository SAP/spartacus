import { ComponentRef, ElementRef, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CmsComponentMapping,
  MatchHandler,
  Priority,
  PriorityHandler,
} from '@spartacus/core';

export abstract class ComponentLauncher
  implements MatchHandler, PriorityHandler {
  abstract getLauncher(
    componentType: string,
    uid: string,
    directiveInjector: Injector
  ): Observable<[ElementRef, ComponentRef<any>?]>;

  abstract hasMatch(componentMapping: CmsComponentMapping): boolean;

  getPriority(): Priority {
    return Priority.NORMAL;
  }
}
