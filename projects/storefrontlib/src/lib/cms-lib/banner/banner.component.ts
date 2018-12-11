import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { CmsService } from '../../cms/facade/cms.service';
import { CmsModuleConfig } from '../../cms/cms-module-config';

@Component({
  selector: 'cx-banner',
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

  hasImage(): boolean {
    return !!this.component && !!this.component && !!this.component.media;
  }

  public getImageUrl(): string {
    return this.hasImage() ? this.component.media.url : '';
  }

  // TODO: implement target
  public getTarget(): string {
    return '_self';
  }

  getAltText(): string {
    return this.hasImage() ? this.component.media.altText : '';
  }

  public getBaseUrl(): string {
    return this.config.server.baseUrl || '';
  }
}
