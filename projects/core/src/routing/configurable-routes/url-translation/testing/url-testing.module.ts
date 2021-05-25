import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MockUrlPipe, URL_TESTING_WHITELISTED_PARAMS } from './mock-url.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [MockUrlPipe],
  exports: [MockUrlPipe],
})
export class UrlTestingModule {
  static whitelistParams(
    whitelistedParams: string[]
  ): ModuleWithProviders<UrlTestingModule> {
    return {
      ngModule: UrlTestingModule,
      providers: [
        {
          provide: URL_TESTING_WHITELISTED_PARAMS,
          useValue: whitelistedParams,
        },
      ],
    };
  }
}
