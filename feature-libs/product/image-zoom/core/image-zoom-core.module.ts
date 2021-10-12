import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class ImageZoomCoreModule {
  static forRoot(): ModuleWithProviders<ImageZoomCoreModule> {
    return {
      ngModule: ImageZoomCoreModule,
    };
  }
}
