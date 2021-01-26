import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultPersonalizationConfig } from './config/default-personalization-config';
import { interceptors } from './http-interceptors/index';

@NgModule({
  providers: [
    ...interceptors,
    provideDefaultConfig(defaultPersonalizationConfig),
  ],
})
export class PersonalizationRootModule {}
