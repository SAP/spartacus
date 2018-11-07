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

  mainImage;
  missingProductImgSrc = missingProductImgSrc;

  private initialLoad = true;

  constructor(private elRef: ElementRef, private cd: ChangeDetectorRef) {}

  ngOnChanges() {
    this.changeImage();
  }

  changeImage() {
    if (this.imageContainer) {
      const image = this.imageContainer[this.imageFormat || DEFAULT_FORMAT];
      if (image && image.url) {
        if (this.initialLoad) {
          (<HTMLElement>this.elRef.nativeElement).classList.add('initialize');
        }
        (<HTMLElement>this.elRef.nativeElement).classList.add('loading');
        this.mainImage = image.url;
        this.cd.detectChanges();
      }
    }
  }

  imgErrorHandler(event) {
    event.target.src = missingProductImgSrc;
  }

  public resetZoom() {
    if (!this.initialLoad) {
      (<HTMLElement>this.elRef.nativeElement).classList.remove('initialize');
      (<HTMLElement>this.elRef.nativeElement).classList.remove('loading');
    }
    this.initialLoad = false;
  }
}
