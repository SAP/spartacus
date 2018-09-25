import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { CmsModuleConfig } from '../../cms/cms-module-config';
import { CmsService } from '../../cms/facade/cms.service';

@Component({
  selector: 'y-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent extends AbstractCmsComponent {
  constructor(
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef,
    protected config: CmsModuleConfig
  ) {
    super(cmsService, cd);
  }

  hasImage() {
    return (
      undefined !== this.component &&
      null !== this.component &&
      null !== this.component.media
    );
  }

  public getImageUrl(): string {
    return this.hasImage() ? this.component.media.url : '';
  }

  // TODO: implement target
  public getTarget(): string {
    return '_self';
  }

  getAltText() {
    return this.component.media.altText;
  }

  public getUrlLink(): string {
    let url = '';

    if (this.component.urlLink !== undefined) {
      url = this.getBaseUrl();
      if (this.component.urlLink.startsWith('/')) {
        url += this.component.urlLink;
      } else {
        url += '/' + this.component.urlLink;
      }
    }
    return url;
  }

  public getBaseUrl() {
    return this.config.server.baseUrl;
  }
}
