import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
} from '@angular/core';
import { Media } from './media.model';
import { MediaService } from './media.service';

const INITIALIZED_CLS = 'initialized';
const LOADING_CLS = 'loading';

@Component({
  selector: 'cx-media',
  templateUrl: './media.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaComponent implements OnChanges {
  /**
   * The media container can hold multiple media items, so that
   * a specific media (by format) can be used or multiple media
   * can be provided in a `srcset` so the browser will figure out
   * the best media for the device.
   */
  @Input() container: any;

  /**
   * if a media format is given, a media for the given format will be rendered
   */
  @Input() format: string;

  /**
   * A specific alt text for an image, which overrules the alt text
   * from the container data.
   */
  @Input() alt: string;

  /**
   * Once the media is loaded, we emit an event.
   */
  @Output() loaded: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

  /**
   * The media contains the info for the UI to create the image. This media
   * object might contain more info once other media types (i.e. video) is supported.
   */
  media: Media;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    protected mediaService: MediaService
  ) {}

  ngOnChanges(): void {
    this.loadImage();
  }

  private loadImage(): void {
    this.renderer.addClass(<HTMLElement>this.elRef.nativeElement, LOADING_CLS);
    this.media = this.mediaService.getImage(
      this.container,
      this.format,
      this.alt
    );
  }

  loadHandler(): void {
    this.renderer.addClass(
      <HTMLElement>this.elRef.nativeElement,
      INITIALIZED_CLS
    );
    this.renderer.removeClass(
      <HTMLElement>this.elRef.nativeElement,
      LOADING_CLS
    );
    this.loaded.emit(this.elRef.nativeElement);
  }

  loadErrorHandler(event): void {
    event.target.src = this.mediaService.getMissingImage();
  }
}
