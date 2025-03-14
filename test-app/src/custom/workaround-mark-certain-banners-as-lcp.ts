import { Injectable, Provider } from '@angular/core';
import { CmsBannerComponent } from '@spartacus/core';
import { BannerComponentService } from '@spartacus/storefront';

@Injectable({ providedIn: 'root' })
export class CustomBannerComponentService extends BannerComponentService {
  override getImageFetchPriority(
    data: CmsBannerComponent
  ): 'low' | 'auto' | 'high' | undefined {
    const LCP_BANNER_NAMES = ['Electronics Homepage Splash Banner Component'];

    if (data.name && LCP_BANNER_NAMES.includes(data.name)) {
      return 'high';
    }

    return super.getImageFetchPriority(data);
  }
}

export const workaroundMarkCertainBannersAsLcp: Provider = {
  provide: BannerComponentService,
  useExisting: CustomBannerComponentService,
};
