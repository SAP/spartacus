import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
} from '@angular/core';
import {
  CmsService,
  CmsVideoComponent,
  PageType,
  SemanticPathService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import {
  Media,
  MediaContainer,
} from '../../../shared/components/media/media.model';
import { MediaService } from '../../../shared/components/media/media.service';

@Component({
  selector: 'cx-video',
  templateUrl: './video.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoComponent {
  @HostBinding('class') styleClasses: string | undefined;

  // @ViewChild('videoPlayer', { read: ElementRef }) videoplayer: ElementRef;

  source: string | undefined;
  videoImage: Media | undefined;
  routerLink: string | any[] | undefined;

  data$: Observable<CmsVideoComponent> = this.component.data$.pipe(
    tap((data) => {
      this.styleClasses = data.styleClasses;
      if (data.video) {
        this.source = this.mediaService.getMedia(data.video)?.src;
      }
      if (data.videoMedia) {
        this.videoImage = this.mediaService.getMedia(
          data.videoMedia as MediaContainer
        );
      }
      if (data.contentPage) {
        this.cmsService
          .getPage({
            id: data.contentPage,
            type: PageType.CONTENT_PAGE,
          })
          .pipe(take(1))
          .subscribe((page) => {
            const pageLabel = page.label || '';
            this.routerLink = this.urlService.transform({
              cxRoute: pageLabel.substring(1),
            });
            this.cd.markForCheck();
          });
      } else {
        this.routerLink = this.getRouterLink(data);
      }
    })
  );

  constructor(
    protected component: CmsComponentData<CmsVideoComponent>,
    protected mediaService: MediaService,
    protected urlService: SemanticPathService,
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef
  ) {}

  protected getRouterLink(data: CmsVideoComponent): string | any[] | undefined {
    if (data.url) {
      return data.url;
    }
    // now page uid is returned, we need page label
    //const pageLabel = data.contentPage;
    //if (pageLabel && pageLabel.startsWith('/') && pageLabel.length > 1) {
    //  return this.urlService.transform({ cxRoute: pageLabel.substring(1) });
    //}

    if (data.product) {
      return this.urlService.transform({
        cxRoute: 'product',
        params: { code: data.product },
      });
    }

    if (data.category) {
      return this.urlService.transform({
        cxRoute: 'category',
        params: { code: data.category },
      });
    }
  }
}
