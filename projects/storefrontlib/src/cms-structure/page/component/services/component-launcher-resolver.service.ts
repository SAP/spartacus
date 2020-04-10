import { Inject, Injectable, Optional } from '@angular/core';
import { ComponentLauncher } from '../launchers/component-launcher';
import { CmsComponentMapping } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentLauncherResolverService {
  constructor(
    @Optional()
    @Inject(ComponentLauncher)
    protected launchers: ComponentLauncher[]
  ) {}

  getLauncher(componentMapping: CmsComponentMapping): ComponentLauncher {
    const matchedLaunchers = this.launchers.filter((launcher) =>
      launcher.hasMatch(componentMapping)
    );
    if (matchedLaunchers.length > 1) {
      matchedLaunchers
        .reverse()
        .sort((a, b) => a.getPriority() - b.getPriority());
    }
    return matchedLaunchers[0];
  }
}
