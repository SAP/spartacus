import { Injectable } from '@angular/core';
import { CmsBannerComponent, CmsService } from '@spartacus/core';
import { CarouselItem } from 'projects/storefrontlib/src/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BannerCarouselService {
  constructor(private cmsService: CmsService) {}

  getCarouselItems(codes: string[]): Observable<CarouselItem>[] {
    return codes.map(code =>
      this.cmsService.getComponentData(code).pipe(map(d => this.convert(d)))
    );
  }

  private convert(data: CmsBannerComponent): CarouselItem {
    return {
      title: data.name,
      media: {
        container: data.media,
        format: 'product',
      },
      componentData: {
        flexType: data.typeCode,
        typeCode: data.typeCode,
        uid: data.uid,
      },
    };
  }
}
