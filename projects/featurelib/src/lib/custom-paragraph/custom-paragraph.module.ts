import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomParagraphComponent } from './custom-paragraph.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CustomParagraphComponent],
  exports: [CustomParagraphComponent],
  entryComponents: [CustomParagraphComponent]
})
export class CustomParagraphModule {}
