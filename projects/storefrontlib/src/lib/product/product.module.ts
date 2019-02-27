import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MediaModule } from './../ui/components/media/media.module';
import { CmsModule } from './../cms/cms.module';

@NgModule({
  imports: [CommonModule, RouterModule, MediaModule, CmsModule]
})
export class ProductModule {}
