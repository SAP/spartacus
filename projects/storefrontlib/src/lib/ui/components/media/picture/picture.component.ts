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
  selector: 'cx-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PictureComponent implements OnChanges {
  @Input() imageContainer;
  @Input() imageFormat: string;

  @Input() media: any;

  /**
   * An alternate text for an image, if the image cannot be displayed.
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
      this.media,
      this.imageFormat,
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
