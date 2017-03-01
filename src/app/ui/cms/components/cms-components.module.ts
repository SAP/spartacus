import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CmsComponentFactoryModule } from '../../cms-component-factory/cms-component-factory.module';
import { CmsParagraphModule } from './cms-paragraph/cms-paragraph.module';

// import { MaterialModule } from '@angular/material';
@NgModule({
    imports: [
        CommonModule,
        CmsParagraphModule
    ],
})
export class CmsComponentsModule { }
