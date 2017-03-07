import { Component, Input, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
@Component({
    selector: 'y-picture',
    templateUrl: './picture.component.html',
    styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {

    baseUrl = 'http://localhost:9001';

    
    @Input() images;
    @Input() imageType;
    @Input() imageFormat;
    @Input() position;


    imageTypes = {
        xs: 'xs',
        sm: 'sm',
        md: 'md',
        lg: 'lg'
    };

    mainImage;
    xsImage;
    smImage;
    mdImage;
    lgImage;

    constructor(
        protected mediaService: MediaService
    ) {}

    ngOnInit() {

        const images = this.mediaService.getImagesByType(this.images, this.imageType);

        this.xsImage = this.getImageByFormat(images, this.imageTypes.xs);
        this.smImage = this.getImageByFormat(images,  this.imageTypes.sm);
        this.mdImage = this.getImageByFormat(images,  this.imageTypes.md);
        this.lgImage = this.getImageByFormat(images,  this.imageTypes.lg);

        this.mainImage = this.mdImage;

    }

    protected getImageByFormat(images: Array<any>, format: string) {
        let image;
        let url;
        switch (format) {
            case this.imageTypes.xs:
                image = this.mediaService.getXsImage(images);
                break;
            case this.imageTypes.sm:
                image = this.mediaService.getSmImage(images);
                break;
            case this.imageTypes.md:
                image = this.mediaService.getMdImage(images);
                break;
            case this.imageTypes.lg:
                image = this.mediaService.getLgImage(images);
                break;
        }
        
        if (image && image.url) {
            url = this.baseUrl + image.url;
        }
        return url;
    }



    
}
