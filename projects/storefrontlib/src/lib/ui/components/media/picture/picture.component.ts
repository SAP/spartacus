import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
} from '@angular/core';
import { Image } from '@spartacus/core';
import {
  missingProductImageAlt,
  missingProductImgSrc,
} from '../../../images/missingProduct';

const DEFAULT_FORMAT = 'product';
const INITIALIZED_CLS = 'initialized';
const LOADING_CLS = 'loading';

@Component({
  selector: 'cx-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
})
export class PictureComponent implements OnChanges {
  @Input() imageContainer;
  @Input() imageFormat: string;
  @Input() imagePosition: string;

  /**
   * An alternate text for an image, if the image cannot be displayed.
   */
  @Input() alt: string;

  /**
   * Additional info on the image, is often shown as a tooltip text when the mouse moves over the element.
   * This is not used often anymore as it's not mobile friendly.
   */
  @Input() title: string;

  @Output() loaded: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

  mainImage: string;
  missingProductImgSrc = missingProductImgSrc;
  missingProductImageAlt = missingProductImageAlt;

  constructor(
    private elRef: ElementRef,
    private cd: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges() {
    this.loadImage();
  }

  loadImage(): void {
    if (this.imageContainer) {
      const image: Image = this.imageContainer[
        this.imageFormat || DEFAULT_FORMAT
      ];
      if (image && image.url) {
        this.renderer.addClass(
          <HTMLElement>this.elRef.nativeElement,
          LOADING_CLS
        );
        this.mainImage = image.url;
        this.cd.detectChanges();
      }
    }
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
    event.target.src = missingProductImgSrc;
  }
}
