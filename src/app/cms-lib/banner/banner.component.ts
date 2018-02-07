import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Store } from '@ngrx/store';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import * as fromStore from '../../cms/store';
import { ConfigService } from '../../cms/config.service';

@Component({
  selector: 'y-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent extends AbstractCmsComponent {
  constructor(
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.CmsState>,
    protected config: ConfigService
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

  protected getImageUrl(): string {
    return this.hasImage() ? this.component.media.url : '';
  }

  // TODO: implement target
  protected getTarget(): string {
    return '_self';
  }
}
