import { Inject, Injectable, isDevMode, Optional } from '@angular/core';
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

  private invalidMappings = new Set<CmsComponentMapping>();

  resolve(componentMapping: CmsComponentMapping): ComponentHandler {
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
}
