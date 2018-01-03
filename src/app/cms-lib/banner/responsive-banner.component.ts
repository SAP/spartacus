import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { AbstractCmsComponent } from '../../newcms/components/abstract-cms-component';
import { CmsService } from '../../data/cms.service';
import { SvgLoaderService } from './svg-loader.service';

@Component({
  selector: 'y-responsive-banner',
  templateUrl: './responsive-banner.component.html'
  //styleUrls: ['./banner.component.scss']
})
export class ResponsiveBannerComponent extends AbstractCmsComponent {

    @ViewChild('svgContainer') svgContainer: ElementRef;

    // TODO: move to a more generic location
    // TODO: Make configurable
    private formats = [
        {code: 'mobile', width: 200},
        {code: 'tablet', width: 500},
        {code: 'desktop', width: 800},
        {code: 'widescreen', width: 1200}
    ];

    /*constructor(
        protected cd: ChangeDetectorRef,
        protected cmsService: CmsService,
        protected svgService: SvgLoaderService
    ) {
        super(cd, cmsService);
    }*/

    protected fetchData() {
        super.fetchData();

        if (this.isSVG()) {
            // we should load the SVG resources from their original domain
            // however we're blocked by CORS. Therefor we use a proxy
            // and load the data and append it to an element.
            //this.svgService.loadSVG(this.getImageUrl()).subscribe((svgData) => {
            //    this.svgContainer.nativeElement.innerHTML = svgData;
            //    this.cd.markForCheck();
            //});
        }
    }

    hasImage() {
        return (undefined !== this.component && null !== this.component.media);
    }

    getImageUrl(): string {
        return (this.getImage()) ? this.getImage().url : '';
    }

    isSVG() {
        //return this.svgService.isSVG(this.getImageUrl());
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
        if (!this.hasImage()) {
            return image;
        }
  
        image = this.component.media["desktop"];
        return image;
    }


    private getImageSrcSet(format: string, width: string) {
        let src = '';
        //const image = this.getImageByFormat(format);
        const image = this.component.media[format];
        if (image) {
            src += this.getBaseUrl() + image.url + ' ' + width + ', ';
        }
        return src;
    }
}
