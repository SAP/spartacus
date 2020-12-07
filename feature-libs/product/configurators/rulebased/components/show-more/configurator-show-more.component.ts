import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'cx-configurator-show-more',
  templateUrl: './configurator-show-more.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorShowMoreComponent implements AfterViewInit {
  showMore = false;
  truncateText = true;

  @Input() text: string;
  @Input() height = 48;
  @ViewChild('textContent') textContentElement: ElementRef;

  ngAfterViewInit() {
    if (this.textContentElement.nativeElement.offsetHeight > this.height) {
      this.showMore = true;
    }
  }

  public toggleShowMore() {
    this.showMore = !this.showMore;
    this.truncateText = !this.truncateText;
  }
}
