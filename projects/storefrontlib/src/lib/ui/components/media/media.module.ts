import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './picture/picture.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PictureComponent],
  exports: [PictureComponent]
})
export class MediaModule {}
