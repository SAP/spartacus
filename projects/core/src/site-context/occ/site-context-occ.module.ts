import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccModule } from '../../occ/occ.module';

@NgModule({
  imports: [OccModule, CommonModule, HttpClientModule],
  providers: [OccModule],
})
export class SiteContextOccModule {}
