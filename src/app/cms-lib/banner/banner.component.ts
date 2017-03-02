import { Component } from '@angular/core';
import { AbstractComponent } from '../../cms/abstract-component.component';
import { CmsModelService } from '../../data/cms-model.service';

@Component({
  selector: 'y-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends AbstractComponent {

    // TODO: move to a more generic location
    // TODO: Make configurable
    private formats = [
        {code: 'mobile', width: 200},
        {code: 'tablet', width: 500},
        {code: 'desktop', width: 800},
        {code: 'widescreen', width: 1200}
    ];

    constructor(
        protected cmsModelService: CmsModelService
    ) {
        super(cmsModelService);
    }


    hasImage() {
        return (null !== this.data && null !== this.data.media);
    }

    hasMultipleFormats() {
        return (this.hasImage() && this.data.media.constructor === Array);
    }

    getUrl() {
        return this.mapUrl(this.data.urlLink);
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
            image = this.getImageByFormat(this.data.media[0].format);
        }else {
            image = this.data.media;
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
        if (!this.data || this.data.media) {
            for (const media of this.data.media) {
                if (media.format === format) {
                    image = media;
                }
            }
        }
        return image;
    }
}
