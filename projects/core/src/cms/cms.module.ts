import { NgModule } from '@angular/core';

import { CmsService } from './facade/index';
import { CmsStoreModule } from './store/cms-store.module';
import { CmsOccModule } from './occ/cms-occ.module';

@NgModule({
  imports: [CmsOccModule, CmsStoreModule],
  providers: [CmsService]
})
export class CmsModule {}
