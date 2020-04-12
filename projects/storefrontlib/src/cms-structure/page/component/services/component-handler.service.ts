import { Inject, Injectable, Optional } from '@angular/core';
import { ComponentHandler } from '../handlers/component-handler';
import { CmsComponentMapping } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentHandlerService {
  constructor(
    @Optional()
    @Inject(ComponentHandler)
    protected handlers: ComponentHandler[]
  ) {}

  resolve(componentMapping: CmsComponentMapping): ComponentHandler {
    const matchedHandlers = (this.handlers ?? []).filter((handler) =>
      handler.hasMatch(componentMapping)
    );
    if (matchedHandlers.length > 1) {
      matchedHandlers.sort((a, b) => a.getPriority() - b.getPriority());
    }
    return matchedHandlers[matchedHandlers.length - 1];
  }
}
