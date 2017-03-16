import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { AbstractCmsComponent } from '../../cms/abstract-cms-component';
import { ConfigService } from '../../cms/config.service';
import { CmsModelService } from '../../data/cms-model.service';
import { SvgLoaderService } from './svg-loader.service';

@Component({
  selector: 'y-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends AbstractCmsComponent {

    @ViewChild('svgContainer') svgContainer: ElementRef;

    // TODO: move to a more generic location
    // TODO: Make configurable
    private formats = [
        {code: 'mobile', width: 200},
        {code: 'tablet', width: 500},
        {code: 'desktop', width: 800},
        {code: 'widescreen', width: 1200}
    ];

    constructor(
        protected cd: ChangeDetectorRef,
        protected configService: ConfigService,
        protected cmsModelService: CmsModelService,
        protected svgService: SvgLoaderService
    ) {
        super(cd, configService, cmsModelService);
    }

    protected fetchData() {
        super.fetchData();

        if (this.isSVG()) {
            // we should load the SVG resources from their original domain
            // however we're blocked by CORS. Therefor we use a proxy
            // and load the data and append it to an element.
            this.svgService.loadSVG(this.getImageUrl()).subscribe((svgData) => {
                this.svgContainer.nativeElement.innerHTML = svgData;
                this.cd.detectChanges();
            });
        }
    }

    hasImage() {
        return (null !== this.model && null !== this.model.media);
    }

    getImageUrl() {
        return this.getImage().url;
    }

    getLinkUrl() {
        return this.mapUrl(this.model.urlLink);
    }

    isSVG() {
        return this.svgService.isSVG(this.getImageUrl());
    }

    // TODO: implement target
    getTarget() {
        return '_self';
    }

    getResponsiveSrcset() {
        let srcset = '';
        for (const format of this.formats) {
            srcset += this.getImageSrcSet(format.code, format.width + 'w');
        }
        return srcset;
    }

    private getImage() {
        let image;
        if (this.hasMultipleFormats()) {
            image = this.getImageByFormat(this.model.media[0].format);
        }else {
            image = this.model.media;
        }
        return image;
    }

    private hasMultipleFormats() {
        return (this.hasImage() && this.model.media.constructor === Array);
    }


    private getImageSrcSet(format: string, width: string) {
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
