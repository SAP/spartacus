import { APP_INITIALIZER, Provider } from '@angular/core';
import { ConfigInitializerService } from 'projects/core/src/config/config-initializer/config-initializer.service';
import { LayoutConfig } from '../config/layout-config';
import { DirectionService } from './direction.service';

export function initHtmlDirAttribute(
  configInit: ConfigInitializerService,
  directionService: DirectionService
) {
  const result = () =>
    configInit.getStableConfig('direction').then((config: LayoutConfig) => {
      directionService.initialize(config?.direction);
    });
  return result;
}

export const HtmlDirProvider: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: initHtmlDirAttribute,
  deps: [ConfigInitializerService, DirectionService],
};
