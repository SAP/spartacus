import { Injectable, Optional } from '@angular/core';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { OccConfig } from '../config/occ-config';

@Injectable({
  providedIn: 'root'
})
export class OccEndpointsService {
  private activeBaseSite = this.config.site.baseSite;

  constructor(
    @Optional() private baseSiteService: BaseSiteService,
    private config: OccConfig
  ) {
    if (this.baseSiteService) {
      this.baseSiteService
        .getActive()
        .subscribe(value => (this.activeBaseSite = value));
    }
  }

  getBaseEndpoint(): string {
    if (!this.config || !this.config.server) {
      return '';
    }

    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.activeBaseSite
    );
  }

  getEndpoint(subPath: string = ''): string {
    return this.getBaseEndpoint() + '/' + subPath;
  }
}
