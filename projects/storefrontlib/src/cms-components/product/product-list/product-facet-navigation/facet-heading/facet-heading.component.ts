import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/index';

@Component({
  selector: 'cx-facet-heading',
  templateUrl: './facet-heading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetHeadingComponent {
  @Input() name: string;
  @Input() expanded: boolean;

  @Input() expandIcon: ICON_TYPE = ICON_TYPE.EXPAND;
  @Input() collapseIcon: ICON_TYPE = ICON_TYPE.COLLAPSE;

  @Output() toggle = new EventEmitter<boolean>();

  //   aria-controls=""
  //   [attr.aria-expanded]="state.collapsed"

  @HostListener('click', ['$event'])
  onEvent(event: MouseEvent) {
    if (this.expanded) {
      // if the panel will collapse by a mouse click, we stop event bubbling
      // as it would trigger the focus event handler.
      event.preventDefault();
      event.stopPropagation();
    }
    this.toggle.emit(true);
  }
}
