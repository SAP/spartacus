import {
  Component,
  Input,
  OnChanges,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { missingProductImgSrc } from '../../../images/missingProduct';

const DEFAULT_FORMAT = 'product';

@Component({
  selector: 'y-picture',
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

  mainImage;
  missingProductImgSrc = missingProductImgSrc;

  constructor(private elRef: ElementRef, private cd: ChangeDetectorRef) {}

  ngOnChanges() {
    this.changeImage();
  }

  changeImage() {
    if (this.imageContainer) {
      const image = this.imageContainer[this.imageFormat || DEFAULT_FORMAT];
      if (image && image.url) {
        this.zoom(0.1);
        this.mainImage = image.url;
        this.cd.detectChanges();
      }
    }
  }

  imgErrorHandler(event) {
    event.target.src = missingProductImgSrc;
  }

  public resetZoom() {
    this.zoom(1);
  }

  private zoom(factor) {
    this.elRef.nativeElement.style.setProperty('--cx-zoom', factor);
  }
}
