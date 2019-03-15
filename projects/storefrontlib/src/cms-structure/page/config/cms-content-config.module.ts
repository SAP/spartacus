import { NgModule } from '@angular/core';
import { ConfigModule } from '@spartacus/core';

import { defaultRetailCmsContentConfig } from './header.config';

@NgModule({
  imports: [ConfigModule.withConfigFactory(defaultRetailCmsContentConfig)]
})
export class CmsContentConfigModule {}
