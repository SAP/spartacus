import { Component } from '@angular/core';
import { AbstractCmsComponent } from '../../cms/abstract-cms-component';

@Component({
  selector: 'y-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends AbstractCmsComponent {

    // TODO: move to a more generic location
    // TODO: Make configurable
    private formats = [
        {code: 'mobile', width: 200},
        {code: 'tablet', width: 500},
        {code: 'desktop', width: 800},
        {code: 'widescreen', width: 1200}
    ];

    isSVG() {
        const image = this.getImage();
        return image && (image.url.indexOf('.svg') > -1);
    }

    hasImage() {
        return (null !== this.model && null !== this.model.media);
    }

    hasMultipleFormats() {
        return (this.hasImage() && this.model.media.constructor === Array);
    }

    getUrl() {
        return this.mapUrl(this.model.urlLink);
    }

    getTarget() {
        return ''; //_blank
    }

    getResponsiveSrcset() {
        let srcset = '';
        for (const format of this.formats) {
            srcset += this.getImageSrcSet(format.code, format.width + 'w');
        }
        
        // srcset += this.getImageSrcSet('tablet', '500w');
        // srcset += this.getImageSrcSet('desktop', '800w');
        // srcset += this.getImageSrcSet('widescreen', '500w');
        return srcset;
    }


    getImage() {
        let image;
        if (this.hasMultipleFormats()) {
            image = this.getImageByFormat(this.model.media[0].format);
        }else {
            image = this.model.media;
        }
        return image;
    }

    getImageSrcSet(format: string, width: string) {
        let src = '';
        const image = this.getImageByFormat(format);
        if (image) {
            src += this.getBaseUrl() + image.url + ' ' + width + ', ';
        }
        return src;
    }

    private getImageByFormat(format: string) {
        let image;
        if (!this.model || this.model.media) {
            for (const media of this.model.media) {
                if (media.format === format) {
                    image = media;
                }
            }
        }
        return image;
    }
}
