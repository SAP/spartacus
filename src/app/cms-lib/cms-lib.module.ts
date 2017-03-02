import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsParagraphModule } from './cms-paragraph/cms-paragraph.module';
import { LinkModule } from './link/link.module';
import { BannerModule } from './banner/banner.module';

// import { MaterialModule } from '@angular/material';
@NgModule({
    imports: [
        CommonModule,
        
        CmsParagraphModule,
        LinkModule,
        BannerModule
    ]
})
export class CmsLibModule { }
