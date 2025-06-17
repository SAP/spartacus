import { inject, Injectable } from '@angular/core';
import { PageMetaLinkService } from './page-meta-link.service';
import { WindowRef, FeatureToggles } from '@spartacus/core';
import { MediaService } from '../../shared/components/media/media.service';

@Injectable({
  providedIn: 'root',
})
export class MediaPreconnectService {
  protected pageMetaLinkService = inject(PageMetaLinkService);
  protected mediaService = inject(MediaService);
  private featureToggles = inject(FeatureToggles);
  private windowRef = inject(WindowRef);

  addPreconnectLink(): void {
    if (!this.featureToggles.createMediaPreconnectLinkInSsr) {
      return;
    }

    if (!this.windowRef.isBrowser()) {
      return;
    }
    const url = this.mediaService.getBaseUrl();
    this.pageMetaLinkService.addPreconnectLink(url);
  }
}
