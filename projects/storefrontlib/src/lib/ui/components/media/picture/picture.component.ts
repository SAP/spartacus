import {
  Component,
  Input,
  OnChanges,
  ElementRef,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import { missingProductImgSrc } from '../../../images/missingProduct';

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

  mainImage;
  missingProductImgSrc = missingProductImgSrc;

  constructor(private elRef: ElementRef, private cd: ChangeDetectorRef) {}

  ngOnChanges() {
    this.loadImage();
  }

  loadImage() {
    if (this.imageContainer) {
      const image = this.imageContainer[this.imageFormat || DEFAULT_FORMAT];
      if (image && image.url) {
        (<HTMLElement>this.elRef.nativeElement).classList.add(LOADING_CLS);
        this.mainImage = image.url;
        this.cd.detectChanges();
      }
    }
  }

  loadHandler() {
    (<HTMLElement>this.elRef.nativeElement).classList.add(INITIALIZED_CLS);
    (<HTMLElement>this.elRef.nativeElement).classList.remove(LOADING_CLS);
    this.loaded.emit(this.elRef.nativeElement);
  }

  loadErrorHandler(event) {
    event.target.src = missingProductImgSrc;
  }
}
