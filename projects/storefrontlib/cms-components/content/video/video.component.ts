import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  CmsBannerComponentMedia,
  CmsResponsiveBannerComponentMedia,
  CmsService,
  CmsVideoComponent,
  ContainerBackgroundOptions,
  ContainerSizeOptions,
  PageType,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
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
export class VideoComponent implements AfterViewChecked, OnDestroy {
  @HostBinding('class') styleClasses: string | undefined;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  source: string | undefined;
  thumbnail: Media | undefined;
  routerLink: string | any[] | undefined;
  autoPlay: boolean;
  loop: boolean;
  mute: string | undefined;
  height: string;
  protected subscriptions = new Subscription();

  data$: Observable<CmsVideoComponent> = this.component.data$.pipe(
    tap((data) => {
      this.styleClasses = data.styleClasses;
      this.setMedia(data.video, data.videoMedia, data.containerBackground);
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
    protected renderer: Renderer2
  ) {}

  ngAfterViewChecked(): void {
    this.renderer.setStyle(
      this.videoPlayer.nativeElement,
      'height',
      this.height
    );
  }

  protected setMedia(
    video?: CmsBannerComponentMedia,
    media?: CmsBannerComponentMedia | CmsResponsiveBannerComponentMedia,
    containerBackground?: ContainerBackgroundOptions
  ) {
    if (video) {
      this.source = this.mediaService.getMedia(video)?.src;
    }

    if (containerBackground ===
      ContainerBackgroundOptions.UPLOAD_RESPONSIVE_IMAGE && media) {
      this.thumbnail = this.mediaService.getMedia(media as MediaContainer);
    }
  }

  protected setControls(autoPlay?: string, loop?: string, mute?: string) {
    this.autoPlay = autoPlay === 'true';
    this.loop = loop === 'true';
    this.mute = mute === 'true' ? 'muted' : undefined;
  }

  protected setVideoHeight(
    containerSize?: ContainerSizeOptions,
    videoContainerHeight?: number
  ) {
    this.height =
      containerSize === ContainerSizeOptions.DEFINE_CONTAINER_HEIGHT &&
      videoContainerHeight
        ? `${videoContainerHeight}px`
        : '100%';
  }

  protected setRouting(data: CmsVideoComponent) {
    if (data.contentPage) {
      this.subscriptions.add(
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
          })
      );
    } else {
      this.routerLink = this.getRouterLink(data);
    }
    this.cd.markForCheck();
  }

  protected getRouterLink(data: CmsVideoComponent): string | any[] | undefined {
    if (data.url) {
      return data.url;
    }

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
