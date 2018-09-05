import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Store } from '@ngrx/store';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import * as fromStore from '../../cms/store';
import { CmsModuleConfig } from '../../cms/cms-module-config';

@Component({
  selector: 'y-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent extends AbstractCmsComponent {
  static componentName = 'BannerComponent';

  constructor(
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.CmsState>,
    protected config: CmsModuleConfig
  ) {
    super(cd, store, config);
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

  public getUrlLink(): string {
    if (this.component.urlLink !== undefined) {
      if (this.component.urlLink.startsWith('/')) {
        return this.component.urlLink;
      } else {
        return '/' + this.component.urlLink;
      }
    }
  }
}
