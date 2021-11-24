import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'cx-configurator-show-more',
  templateUrl: './configurator-show-more.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorShowMoreComponent implements AfterViewInit {
  showMore = false;
  showHiddenText = false;
  textToShow: string;
  textNormalized: string;

  @Input() text: string;
  @Input() textSize = 60;
  @Input() productName: string;

  constructor(protected cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.textNormalized = this.normalize(this.text);

    if (this.textNormalized.length > this.textSize) {
      this.showMore = true;
      this.textToShow = this.textNormalized.substring(0, this.textSize);
    } else {
      this.textToShow = this.textNormalized;
    }
    this.cdRef.detectChanges();
  }

  toggleShowMore(): void {
    this.showHiddenText = !this.showHiddenText;

    this.showHiddenText
      ? (this.textToShow = this.textNormalized)
      : (this.textToShow = this.textNormalized.substring(0, this.textSize));

    this.cdRef.detectChanges();
  }

  protected normalize(text: string = ''): string {
    return text.replace(/<[^>]*>/g, '');
  }
}
