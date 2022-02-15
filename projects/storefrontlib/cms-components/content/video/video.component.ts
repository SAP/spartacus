import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { Config } from '@spartacus/core';
import { tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-video',
  templateUrl: './video.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoComponent {
  @HostBinding('class') styleClasses: string;

  source = '';

  data$ = this.component.data$.pipe(
    tap((data) => (this.source = this.resolveAbsoluteUrl(data.video.url)))
  );

  constructor(
    protected component: CmsComponentData<any>,
    protected config: Config
  ) {}

  @ViewChild('videoPlayer', { static: false }) videoplayer: ElementRef;

  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }

  protected resolveAbsoluteUrl(url: string): string {
    return !url || url.startsWith('http') || url.startsWith('//')
      ? url
      : this.getBaseUrl() + url;
  }

  protected getBaseUrl(): string {
    return (
      this.config.backend?.media?.baseUrl ??
      this.config.backend?.occ?.baseUrl ??
      ''
    );
  }
}
