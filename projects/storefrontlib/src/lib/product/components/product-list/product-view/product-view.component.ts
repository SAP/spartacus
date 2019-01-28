import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';

export enum ViewModes {
  Grid = 'grid',
  List = 'list'
}

@Component({
  selector: 'cx-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductViewComponent {
  @Input()
  mode: ViewModes;
  @Output()
  modeChange = new EventEmitter<string>();

  get buttonClass() {
    return `cx-product-search__layout--${this.mode}`;
  }

  changeMode() {
    const newMode =
      this.mode === ViewModes.Grid ? ViewModes.List : ViewModes.Grid;
    this.modeChange.emit(newMode);
  }
}
