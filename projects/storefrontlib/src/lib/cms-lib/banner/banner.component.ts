import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';

@Component({
  selector: 'y-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent extends AbstractCmsComponent {
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
}
