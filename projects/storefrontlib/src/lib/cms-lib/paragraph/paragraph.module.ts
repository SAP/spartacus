import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParagraphComponent } from './paragraph.component';
import { TabParagraphComponent } from './tab-paragraph/tab-paragraph.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ParagraphComponent, TabParagraphComponent],
  exports: [ParagraphComponent, TabParagraphComponent],
  entryComponents: [ParagraphComponent, TabParagraphComponent]
})
export class CmsParagraphModule {}
