import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OccCmsService } from './occ-cms.service';
import { ComponentMapperService } from './component-mapper.service';
import { DefaultPageService } from './default-page.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [OccCmsService, ComponentMapperService, DefaultPageService]
})
export class CmsOccModule {}
