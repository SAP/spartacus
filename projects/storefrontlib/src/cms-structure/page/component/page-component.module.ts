import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { ComponentLauncher } from './launchers/component-launcher';
import { CmsComponentLauncherService } from './launchers/cms-component-launcher.service';
import { WebComponentLauncherService } from './launchers/web-component-launcher.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ComponentLauncher,
      useExisting: CmsComponentLauncherService,
      multi: true,
    },
    {
      provide: ComponentLauncher,
      useExisting: WebComponentLauncherService,
      multi: true,
    },
  ],
  declarations: [ComponentWrapperDirective],
  exports: [ComponentWrapperDirective],
})
export class PageComponentModule {}
