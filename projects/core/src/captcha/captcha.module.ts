import { NgModule, ModuleWithProviders } from '@angular/core';
import { CaptchaService } from './facade/captcha.service';
import { CaptchaConfig } from './config';
import { Config, provideConfig } from '../config/config.module';
import { defaultCaptchaConfig } from './config/default-captcha-config';

@NgModule({
  imports: [],
  providers: [CaptchaService, { provide: CaptchaConfig, useExisting: Config }],
})
export class CaptchaModule {
  static forRoot(): ModuleWithProviders<CaptchaModule> {
    return {
      ngModule: CaptchaModule,
      providers: [
        CaptchaService,
        { provide: CaptchaConfig, useExisting: Config },
        provideConfig(defaultCaptchaConfig),
      ],
    };
  }
}
