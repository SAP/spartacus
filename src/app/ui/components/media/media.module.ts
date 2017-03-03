import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './picture/picture.component';
import { MediaService } from './media.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [PictureComponent],
    providers: [MediaService],
    exports: [
        PictureComponent
    ]
})
export class MediaModule { }
