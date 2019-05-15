import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ICON_TYPES } from '../../../misc/icon';

export enum ViewModes {
  Grid = 'grid',
  List = 'list',
}

@Component({
  selector: 'cx-product-view',
  templateUrl: './product-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductViewComponent {
  iconTypes = ICON_TYPES;
  @Input()
  mode: ViewModes;
  @Output()
  modeChange = new EventEmitter<string>();

  get buttonClass() {
    return `cx-product-${this.mode}`;
  }

  /**
   * Display icons inversely to allow users to
   * see the view they will navigate to
   */
  get viewMode() {
    if (this.mode === 'list') {
      return this.iconTypes.GRID;
    } else if (this.mode === 'grid') {
      return this.iconTypes.LIST;
    }
  }

  changeMode() {
    const newMode =
      this.mode === ViewModes.Grid ? ViewModes.List : ViewModes.Grid;
    this.modeChange.emit(newMode);
  }
}
