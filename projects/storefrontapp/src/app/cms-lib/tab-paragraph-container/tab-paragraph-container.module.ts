import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { TabParagraphContainerComponent } from './tab-paragraph-container.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [TabParagraphContainerComponent],
  entryComponents: [TabParagraphContainerComponent],
  exports: [TabParagraphContainerComponent]
})
export class TabParagraphContainerModule {}
