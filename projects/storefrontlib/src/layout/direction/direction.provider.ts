import { APP_INITIALIZER, Provider } from '@angular/core';
import { DirectionService } from './direction.service';

export function initHtmlDirAttribute(_directionService: DirectionService) {
  const result = () => {};
  return result;
}

export const HtmlDirProvider: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: initHtmlDirAttribute,
  deps: [DirectionService],
};
