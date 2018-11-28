import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MediaModule } from './../ui/components/media/media.module';
import { CmsModule } from './../cms/cms.module';

// guards
import { guards } from './guards/index';

@NgModule({
  imports: [CommonModule, RouterModule, MediaModule, CmsModule],
  providers: [...guards]
})
export class ProductModule {}
