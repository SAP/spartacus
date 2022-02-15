import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { CmsVideoComponent } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { MediaService } from '../../../shared/components/media/media.service';

@Component({
  selector: 'cx-video',
  templateUrl: './video.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoComponent {
  @HostBinding('class') styleClasses: string | undefined;

  @ViewChild('videoPlayer', { read: ElementRef }) videoplayer: ElementRef;

  source: string | undefined;

  data$: Observable<CmsVideoComponent> = this.component.data$.pipe(
    tap((data) => {
      this.styleClasses = data.styleClasses;
      if (data.video) {
        this.source = this.mediaService.getMedia(data.video)?.src;
      }
    })
  );

  constructor(
    protected component: CmsComponentData<CmsVideoComponent>,
    protected mediaService: MediaService
  ) {}

  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }
}
