import { Injectable } from '@angular/core';

const DEFAULT_IMAGE_FORMAT = 'product';

@Injectable()
export class MediaService {
    
    getXsImage(images) {
        return this.getImageByFormat(images, 'thumbnail');
    }
    getSmImage(images) {
        return this.getImageByFormat(images, 'thumbnail');
    }
    getMdImage(images) {
        return this.getImageByFormat(images, 'product');
    }
    getLgImage(images) {
        return this.getImageByFormat(images, 'zoom');
    }

    getImageByFormat(images: Array<any>, imageFormat: string) {
        let selection;

        if (!imageFormat) {
            imageFormat = DEFAULT_IMAGE_FORMAT;
        }
        for (const image of images) {
            if (imageFormat === image.format) {
                selection = image;
            }
        }
        return selection;
    }

    getImagesByType(images: Array<any>, imageType: string) {
        const selection = [];

        if (images) {
            for (const image of images) {
                if (imageType === image.imageType) {
                    selection.push(image);
                }
            }
        }
        return selection;
    }

}
