import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';
import { TabParagraphContainerComponent } from './tab-paragraph-container.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule.forRoot()
    ],
    declarations: [TabParagraphContainerComponent],
    entryComponents: [TabParagraphContainerComponent],
    exports: [TabParagraphContainerComponent]
})
export class TabParagraphContainerModule { }
