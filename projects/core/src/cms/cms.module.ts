import { NgModule } from '@angular/core';

import { CmsService } from './facade/index';
import { CmsStoreModule } from './store/cms-store.module';
import { CmsOccModule } from './occ/cms-occ.module';
import { CmsPageTitleModule } from './page/page.module';

@NgModule({
  imports: [CmsOccModule, CmsStoreModule, CmsPageTitleModule],
  providers: [CmsService]
})
export class CmsModule {}
