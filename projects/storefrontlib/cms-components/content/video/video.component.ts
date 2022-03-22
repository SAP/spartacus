import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import {
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
export class VideoComponent implements OnDestroy {
  @HostBinding('class') styleClasses: string | undefined;

  source: string | undefined;
  thumbnail: Media | undefined;
  routerLink: string | any[] | undefined;
  autoPlay: boolean;
  loop: boolean;
  mute: string | undefined;
  protected subscriptions = new Subscription();

  data$: Observable<CmsVideoComponent> = this.component.data$.pipe(
    tap((data) => {
      this.styleClasses = data.styleClasses;
      this.setMedia(data);
      this.setControls(data);
      this.setRouting(data);
    })
  );

  constructor(
    protected component: CmsComponentData<CmsVideoComponent>,
    protected mediaService: MediaService,
    protected urlService: SemanticPathService,
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef
  ) {}

  protected setMedia(data: CmsVideoComponent) {
    if (data.video) {
      this.source = this.mediaService.getMedia(data.video)?.src;
    }

    if (
      data.containerBackground ===
        ContainerBackgroundOptions.UPLOAD_RESPONSIVE_IMAGE &&
      data.videoMedia
    ) {
      this.thumbnail = this.mediaService.getMedia(
        data.videoMedia as MediaContainer
      );
    }
  }

  protected setControls(data: CmsVideoComponent) {
    this.autoPlay = data.autoPlay === 'true';
    this.loop = data.loop === 'true';
    this.mute = data.mute === 'true' ? 'muted' : undefined;
  }

  protected setRouting(data: CmsVideoComponent) {
    if (data.url) {
      this.routerLink = data.url;
    } else if (data.contentPage) {
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
            this.cd.markForCheck();
          })
      );
    } else if (data.product) {
      this.routerLink = this.urlService.transform({
        cxRoute: 'product',
        params: { code: data.product },
      });
    } else if (data.category) {
      this.routerLink = this.urlService.transform({
        cxRoute: 'category',
        params: { code: data.category },
      });
    }
  }

  protected getHeight(data: CmsVideoComponent): number | undefined {
    if (
      data.containerSize === ContainerSizeOptions.DEFINE_CONTAINER_HEIGHT &&
      data.videoContainerHeight
    ) {
      return data.videoContainerHeight;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
