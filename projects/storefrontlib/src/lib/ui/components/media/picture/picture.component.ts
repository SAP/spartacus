import { Component, Input, OnChanges } from '@angular/core';

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

  constructor() {}

  ngOnChanges() {
    this.changeImage();
  }

  changeImage() {
    if (this.imageContainer) {
      const image = this.imageContainer[this.imageFormat || DEFAULT_FORMAT];
      if (image && image.url) {
        this.mainImage = image.url;
      }
    }
  }
}
