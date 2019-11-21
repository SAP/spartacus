import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cx-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishListItemComponent {
  @Input() cartEntry: any;
}
