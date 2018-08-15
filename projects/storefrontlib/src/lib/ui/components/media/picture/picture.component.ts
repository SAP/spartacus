import { Component, Input, OnInit } from '@angular/core';
// we use the config from occ module, maybe we need create config inside this module
import { ConfigService } from '../../../../occ/config.service';

const DEFAULT_FORMAT = 'product';

@Component({
  selector: 'y-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  @Input() imageContainer;
  @Input() imageFormat;
  @Input() imagePosition;

  mainImage;
  // imageTypes = {
  //     xs: 'xs',
  //     sm: 'thumbnail',
  //     md: 'md',
  //     lg: 'lg'
  // };

  // xsImage;
  // smImage;
  // mdImage;
  // lgImage;

  constructor(protected config: ConfigService) {}

  ngOnInit() {
    if (this.imageContainer) {
      const image = this.imageContainer[this.imageFormat || DEFAULT_FORMAT];
      if (image && image.url) {
        this.mainImage = image.url.startsWith('/')
          ? this.config.server.baseUrl + image.url
          : image.url;
      }
    }
  }
}
