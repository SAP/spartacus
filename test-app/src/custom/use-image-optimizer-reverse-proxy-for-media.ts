import { Injectable, Provider } from '@angular/core';
import { MediaService } from '@spartacus/storefront';

@Injectable({ providedIn: 'root' })
export class CustomMediaService extends MediaService {
  protected override resolveAbsoluteUrl(url: string): string {
    const IMAGE_OPTIMIZER_REVERSE_PROXY_BASE_URL =
      'https://sparta-api.platis.dev/cdn-cgi/image/format=auto/';

    return (
      IMAGE_OPTIMIZER_REVERSE_PROXY_BASE_URL + super.resolveAbsoluteUrl(url)
    );
  }
}

export const useImageOptimizerReverseProxyForMedia: Provider = {
  provide: MediaService,
  useExisting: CustomMediaService,
};
