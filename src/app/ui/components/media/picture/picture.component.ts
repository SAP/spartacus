import { Component, Input, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
@Component({
    selector: 'y-picture',
    templateUrl: './picture.component.html',
    styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {

    baseUrl = 'http://localhost:9001';
    
    
    mainImage;
    xsImage;
    smImage;
    mdImage;
    lgImage;

    @Input() images;
    @Input() imageType;
    @Input() position;

    constructor(
        protected mediaService: MediaService
    ) {}

    ngOnInit() {
        
        const images = this.mediaService.getImagesByType(this.images, this.imageType);

        this.mainImage = this.baseUrl + this.mediaService.getMdImage(images).url;
        
        this.xsImage = this.baseUrl + this.mediaService.getXsImage(images).url;
        this.smImage = this.baseUrl + this.mediaService.getSmImage(images).url;
        this.mdImage = this.baseUrl + this.mediaService.getMdImage(images).url;
        this.lgImage = this.baseUrl +  this.mediaService.getLgImage(images).url;
        
        console.log(this.mainImage);
    }



    
}
