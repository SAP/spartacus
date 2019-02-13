import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccModule } from '../../occ/occ.module';

import { OccSiteService } from './occ-site.service';
@NgModule({
  imports: [OccModule, CommonModule, HttpClientModule],
  providers: [OccModule, OccSiteService]
})
export class SiteContextOccModule {}
