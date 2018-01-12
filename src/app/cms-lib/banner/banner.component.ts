import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Store } from '@ngrx/store';
import { AbstractCmsComponent } from '../../newcms/components/abstract-cms-component';
import { SvgLoaderService } from './svg-loader.service';
import * as fromStore from '../../newcms/store';
import { ConfigService } from '../../newcms/config.service';

@Component({
  selector: 'y-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends AbstractCmsComponent {
  @ViewChild('svgContainer') svgContainer: ElementRef;

  constructor(
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.CmsState>,
    protected config: ConfigService,
    private svgService: SvgLoaderService
  ) {
    super(cd, store, config);
  }

  protected fetchData() {
    super.fetchData();

    if (this.isSVG()) {
      // we should load the SVG resources from their original domain
      // however we're blocked by CORS. Therefor we use a proxy
      // and load the data and append it to an element.
      this.svgService.loadSVG(this.getImageUrl()).subscribe(svgData => {
        this.svgContainer.nativeElement.innerHTML = svgData;
        this.cd.markForCheck();
      });
    }
  }

  protected hasImage(): boolean {
    return null !== this.component && null !== this.component.media;
  }

  protected getImageUrl(): string {
    return this.hasImage() ? this.component.media.url : '';
  }

  protected isSVG(): boolean {
    return this.svgService.isSVG(this.getImageUrl());
  }

  // TODO: implement target
  protected getTarget(): string {
    return '_self';
  }
}
