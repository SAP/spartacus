import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'cx-amend-order-actions',
  templateUrl: './amend-order-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmendOrderActionsComponent {
  @Input() orderCode: string;
  @Input() isValid: string;
  @Input() backRoute: string;
  @Input() forwardRoute: string;

  @HostBinding('class') styles = 'row';
}
