import { NgModule } from '@angular/core';

import { CmsService } from './facade';
import { CmsStoreModule } from './store/cms-store.module';
import { CmsOccModule } from './occ';
import { ComponentMapperService, DefaultPageService } from './services';

@NgModule({
  imports: [CmsOccModule, CmsStoreModule],
  providers: [CmsService, DefaultPageService, ComponentMapperService]
})
export class CmsModule {}
