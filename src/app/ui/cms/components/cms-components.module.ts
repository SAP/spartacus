import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsParagraphModule } from './cms-paragraph/cms-paragraph.module';
import { LinkModule } from './link/link.module';

// import { MaterialModule } from '@angular/material';
@NgModule({
    imports: [
        CommonModule,
        
        CmsParagraphModule,
        LinkModule
    ],
})
export class CmsComponentsModule { }
