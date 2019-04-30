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
   * An alternate text for an image, if the image cannot be displayed.
   * The media itself migth have an alt text already, this alt however will override.
   */
  @Input() alt: string;

  @Output() loaded: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

  /**
   * The main image will be used by browser that do not support srcset's
   */
  image: Media;

  srcset: string;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    protected mediaService: MediaService
  ) {}

  ngOnChanges() {
    this.loadImage();
  }

  private loadImage() {
    this.renderer.addClass(<HTMLElement>this.elRef.nativeElement, LOADING_CLS);
    this.image = this.mediaService.getImage(
      this.container,
      this.format,
      this.alt
    );
  }

  loadHandler() {
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

  loadErrorHandler(event) {
    event.target.src = this.mediaService.getMissingImage();
  }
}
