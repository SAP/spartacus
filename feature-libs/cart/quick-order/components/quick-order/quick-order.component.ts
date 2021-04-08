import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-quick-order',
  templateUrl: './quick-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderComponent {
  clear(): void {
    // TODO
  }

  addToCart(): void {
    // TODO
  }
}
