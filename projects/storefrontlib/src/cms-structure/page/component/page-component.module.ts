import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { componentLauncherMapProvider } from './component-launcher-mapping';

@NgModule({
  imports: [CommonModule],
  providers: [componentLauncherMapProvider],
  declarations: [ComponentWrapperDirective],
  exports: [ComponentWrapperDirective],
})
export class PageComponentModule {}
