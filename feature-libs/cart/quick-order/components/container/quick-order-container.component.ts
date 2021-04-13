import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-quick-order-container',
  templateUrl: './quick-order-container.component.html',
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
