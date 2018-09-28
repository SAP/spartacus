import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabParagraphContainerComponent } from './tab-paragraph-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TabParagraphContainerComponent],
  entryComponents: [TabParagraphContainerComponent],
  exports: [TabParagraphContainerComponent]
})
export class TabParagraphContainerModule {}
