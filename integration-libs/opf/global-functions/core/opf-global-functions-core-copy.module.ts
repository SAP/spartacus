import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultGlobalSpinnerLayoutConfig } from './config/default-opf-global-layout.config';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [],
  providers: [
    ...facadeProviders,
    provideDefaultConfig(defaultGlobalSpinnerLayoutConfig),
  ],
})
export class OpfGlobalFunctionsCoreModule {}
