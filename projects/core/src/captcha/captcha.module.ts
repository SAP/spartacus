import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
  imports: [],
})
export class CaptchaModule {
  static forRoot(): ModuleWithProviders<CaptchaModule> {
    return {
      ngModule: CaptchaModule,
      providers: [],
    };
  }
}
