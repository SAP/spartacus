import { CommonModule } from '@angular/common';
import { APP_BOOTSTRAP_LISTENER, ComponentRef, NgModule } from '@angular/core';
import { FeatureConfigService } from '@spartacus/core';
import { PageSlotModule } from '../../../cms-structure/page/slot/page-slot.module';
import { OutletModule } from '../../outlet/outlet.module';
import { PageLayoutComponent } from './page-layout.component';
import { PageTemplateStyleService } from './page-template-style.service';

export function initPageTemplateStyle(
  service: PageTemplateStyleService,
  featureConfigService: FeatureConfigService
) {
  const result = (componentRef: ComponentRef<any>) => {
    if (featureConfigService.isLevel('2.1')) {
      service.initialize(componentRef);
    }
  };
  return result;
}

@NgModule({
  imports: [CommonModule, OutletModule, PageSlotModule],
  declarations: [PageLayoutComponent],
  exports: [PageLayoutComponent],

  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      useFactory: initPageTemplateStyle,
      deps: [PageTemplateStyleService, FeatureConfigService],
    },
  ],
})
export class PageLayoutModule {}
