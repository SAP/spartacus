import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CmsComponentFactoryModule } from '../../cms-component-factory/cms-component-factory.module';
import { CmsParagraphComponent } from './cms-paragraph.component';

// import { MaterialModule } from '@angular/material';
@NgModule({
    imports: [
        CommonModule
        // CmsComponentFactoryModule
        // MaterialModule.forRoot()
    ],
    declarations: [CmsParagraphComponent],
    exports: [CmsParagraphComponent],
    entryComponents: [CmsParagraphComponent]
})
export class CmsParagraphModule { }