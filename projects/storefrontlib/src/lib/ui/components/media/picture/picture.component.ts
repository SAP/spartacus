import {
  Component,
  Input,
  OnChanges,
  ElementRef,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  Renderer2
} from '@angular/core';
import { missingProductImgSrc } from '../../../images/missingProduct';
import { Image } from '@spartacus/core';

const DEFAULT_FORMAT = 'product';
const INITIALIZED_CLS = 'initialized';
const LOADING_CLS = 'loading';

@Component({
  selector: 'cx-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnChanges {
  @Input()
  imageContainer;
  @Input()
  imageFormat;
  @Input()
  imagePosition;
  @Input()
  imageAlt;
  @Output()
  loaded: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

  mainImage: string;
  missingProductImgSrc = missingProductImgSrc;

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
