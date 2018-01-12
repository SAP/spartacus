import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Store } from '@ngrx/store';
import { AbstractCmsComponent } from '../../newcms/components/abstract-cms-component';
import * as fromStore from '../../newcms/store';
import { ConfigService } from '../../newcms/config.service';

@Component({
  selector: 'y-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends AbstractCmsComponent {
  constructor(
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.CmsState>,
    protected config: ConfigService
  ) {
    super(cd, store, config);
  }

  protected hasImage(): boolean {
    return null !== this.component && null !== this.component.media;
  }

  protected getImageUrl(): string {
    return this.hasImage() ? this.component.media.url : '';
  }

  // TODO: implement target
  protected getTarget(): string {
    return '_self';
  }
}
