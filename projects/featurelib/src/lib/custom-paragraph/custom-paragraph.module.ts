import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomParagraphComponent } from './custom-paragraph.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CustomParagraphComponent],
  exports: [CustomParagraphComponent],
  entryComponents: [CustomParagraphComponent],
  providers: [
    {
      provide: 'cmsComponentMapping',
      multi: true,
      useValue: { CMSParagraphComponent: 'CustomParagraphComponent' }
    }
  ]
})
export class CustomParagraphModule {}
