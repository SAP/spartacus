import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SortModel } from '@spartacus/core';

@Component({
  selector: 'cx-sorting',
  templateUrl: './sorting.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingComponent implements AfterViewInit {
  @Input()
  sortOptions: SortModel[];
  @Input()
  selectedOption: string;
  @Input()
  placeholder: string;
  @Input()
  ariaControls: string;
  @Input()
  sortLabels: { [code: string]: string };

  @Output()
  sortListEvent: EventEmitter<string>;

  constructor(protected elRef: ElementRef) {
    this.sortListEvent = new EventEmitter<string>();
  }

  sortList(sortCode: string): void {
    this.sortListEvent.emit(sortCode);
  }

  get selectedLabel() {
    return (
      this.sortOptions?.find((sort) => sort.code === this.selectedOption)
        ?.name ?? this.sortLabels?.[this.selectedOption]
    );
  }

  ngAfterViewInit(): void {
    this.bindAriaAttributes();
  }

  /**
   * By default, the combobox div inside the native Angular component, `ng-select`, does
   * not contain accessible attributes (aria-label or aria-controls). So we bind these
   * once view is initialized.
   */
  bindAriaAttributes(): void {
    let element = this.elRef.nativeElement.querySelector(
      '[role="combobox"]'
    ) as HTMLElement;

    element.setAttribute('aria-label', this.selectedLabel || this.placeholder);
    element.setAttribute('aria-controls', this.ariaControls);
  }
}
