import { Provider, Type } from '@angular/core';
import { ComponentLauncherService } from './launchers/component-launcher.service';
import { CmsComponentLauncherService } from './launchers/cms-component-launcher.service';
import { WebComponentLauncherService } from './launchers/web-component-launcher.service';
import { ComponentType } from './model/component-type.model';

export abstract class ComponentLauncherMap {
  [context: string]: Type<ComponentLauncherService>;
}

export function componentLauncherMapFactory() {
  return {
    [ComponentType.CmsComponent]: CmsComponentLauncherService,
    [ComponentType.WebComponent]: WebComponentLauncherService,
  };
}

export const componentLauncherMapProvider: Provider = {
  provide: ComponentLauncherMap,
  useFactory: componentLauncherMapFactory,
};
