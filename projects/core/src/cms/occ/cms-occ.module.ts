import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccCmsService } from './cms.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [OccCmsService]
})
export class CmsOccModule {}
