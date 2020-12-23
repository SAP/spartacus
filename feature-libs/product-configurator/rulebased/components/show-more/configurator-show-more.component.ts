import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cx-configurator-show-more',
  templateUrl: './configurator-show-more.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorShowMoreComponent implements AfterViewInit {
  showMore$ = new BehaviorSubject<boolean>(false);
  showHiddenText$ = new BehaviorSubject<boolean>(false);
  textToShow: string;
  textNormalized: string;

  @Input() text: string;
  @Input() textSize = 60;
  @ViewChild('textContent') textContentElement: ElementRef;

  constructor(protected cdRef: ChangeDetectorRef) {
    console.log(this.text);
  }

  ngAfterViewInit(): void {
    this.textNormalized = this.normalize(this.text);

    console.log(this.textNormalized.length, this.textSize);

    if (this.textNormalized.length > this.textSize) {
      this.showMore$.next(true);
      this.textToShow = this.textNormalized.substring(0, this.textSize);
      this.cdRef.detectChanges();
    }
  }

  toggleShowMore(): void {
    this.showHiddenText$.next(!this.showHiddenText$.value);

    this.showHiddenText$.value
      ? (this.textToShow = this.textNormalized)
      : (this.textToShow = this.textNormalized.substring(0, this.textSize));

    this.cdRef.detectChanges();
  }

  protected normalize(text: string): string {
    return text.replace(/<[^>]*>/g, '');
  }
}
