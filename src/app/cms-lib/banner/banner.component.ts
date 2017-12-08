import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  ViewChild
} from "@angular/core";
import { AbstractCmsComponent } from "../abstract-cms-component";
import { CmsService } from "../../data/cms.service";
import { SvgLoaderService } from "./svg-loader.service";

@Component({
  selector: "y-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.scss"]
})
export class BannerComponent extends AbstractCmsComponent {
  @ViewChild("svgContainer") svgContainer: ElementRef;

  // TODO: move to a more generic location
  // TODO: Make configurable
  private formats = [
    { code: "mobile", width: 200 },
    { code: "tablet", width: 500 },
    { code: "desktop", width: 800 },
    { code: "widescreen", width: 1200 }
  ];

  constructor(
    protected cd: ChangeDetectorRef,
    protected cmsService: CmsService,
    protected svgService: SvgLoaderService
  ) {
    super(cd, cmsService);
  }

  protected fetchData() {
    super.fetchData();

    if (this.isSVG()) {
      // we should load the SVG resources from their original domain
      // however we're blocked by CORS. Therefor we use a proxy
      // and load the data and append it to an element.
      this.svgService.loadSVG(this.getImageUrl()).subscribe(svgData => {
        this.svgContainer.nativeElement.innerHTML = svgData;
        this.cd.markForCheck();
      });
    }
  }

  hasImage() {
    return null !== this.component && null !== this.component.media;
  }

  getImageUrl(): string {
    return this.hasImage() ? this.component.media.url : "";
  }

  isSVG() {
    return this.svgService.isSVG(this.getImageUrl());
  }

  // TODO: implement target
  getTarget() {
    return "_self";
  }
}
