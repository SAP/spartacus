import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParagraphComponent } from './paragraph.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ParagraphComponent],
  exports: [ParagraphComponent],
  entryComponents: [ParagraphComponent]
})
export class CmsParagraphModule {}
