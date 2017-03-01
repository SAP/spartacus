import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsParagraphComponent } from './cms-paragraph.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [CmsParagraphComponent],
    exports: [CmsParagraphComponent],
    entryComponents: [CmsParagraphComponent]
})
export class CmsParagraphModule { }