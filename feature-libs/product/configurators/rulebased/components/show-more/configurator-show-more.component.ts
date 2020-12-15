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

  @Input() text: string;
  @Input() textSize = 70;
  @ViewChild('textContent') textContentElement: ElementRef;

  constructor(protected cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.text.length > this.textSize) {
      this.showMore$.next(true);
      this.textToShow = this.text.substring(0, this.textSize);
      this.cdRef.detectChanges();
    }
  }

  toggleShowMore(): void {
    this.showHiddenText$.next(!this.showHiddenText$.value);

    this.showHiddenText$.value
      ? (this.textToShow = this.text)
      : (this.textToShow = this.text.substring(0, this.textSize));

    this.cdRef.detectChanges();
  }
}
