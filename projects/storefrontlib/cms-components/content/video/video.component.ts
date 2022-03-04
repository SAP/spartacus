import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
} from '@angular/core';
import {
  CmsBannerComponentMedia,
  CmsResponsiveBannerComponentMedia,
  CmsService,
  CmsVideoComponent,
  ContainerSizeOptions,
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

  source: string | undefined;
  thumbnail: Media | undefined;
  routerLink: string | any[] | undefined;
  autoplay: boolean;
  loop: boolean;
  mute: string | undefined;

  data$: Observable<CmsVideoComponent> = this.component.data$.pipe(
    tap((data) => {
      this.styleClasses = data.styleClasses;
      this.setMedia(data.video, data.videoMedia);
      this.setControls(data.autoPlay, data.loop, data.mute);
      this.setVideoHeight(data.containerSize, data.videoContainerHeight);
      this.setRouting(data);
    })
  );

  constructor(
    protected component: CmsComponentData<CmsVideoComponent>,
    protected mediaService: MediaService,
    protected urlService: SemanticPathService,
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef,
    protected el: ElementRef
  ) {}

  setControls(autoPlay?: string, loop?: string, mute?: string) {
    this.autoplay = autoPlay === 'true';
    this.loop = loop === 'true';
    this.mute = mute === 'true' ? 'muted' : undefined;
  }

  protected setVideoHeight(
    containerSize?: ContainerSizeOptions,
    videoContainerHeight?: number
  ) {
    const height =
      containerSize === ContainerSizeOptions.DEFINE_CONTAINER_HEIGHT
        ? `${videoContainerHeight}`
        : '100%';
        console.log('this is height', height);
    this.el.nativeElement.style.setProperty('height', height);
  }

  protected setMedia(
    video?: CmsBannerComponentMedia,
    media?: CmsBannerComponentMedia | CmsResponsiveBannerComponentMedia
  ) {
    if (video) {
      this.source = this.mediaService.getMedia(video)?.src;
    }

    if (media) {
      this.thumbnail = this.mediaService.getMedia(media as MediaContainer);
    }
  }

  protected setRouting(data: CmsVideoComponent) {
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
  }

  protected getRouterLink(data: CmsVideoComponent): string | any[] | undefined {
    if (data.url) {
      return data.url;
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
          return this.urlService.transform({
            cxRoute: pageLabel.substring(1),
          });
        });
    }

    if (data.product) {
      console.log('in product');
      return this.urlService.transform({
        cxRoute: 'product',
        params: { code: data.product },
      });
    }

    if (data.category) {
      console.log('in category');
      return this.urlService.transform({
        cxRoute: 'category',
        params: { code: data.category },
      });
    }
  }
}
