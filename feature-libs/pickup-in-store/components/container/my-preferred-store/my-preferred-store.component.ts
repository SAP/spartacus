import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';

@Component({
  selector: 'cx-my-preferred-store',
  templateUrl: 'my-preferred-store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyPreferredStoreComponent {
  public storeSelected$ = this.preferredStoreService.getPreferredStore$();
  constructor(private preferredStoreService: PreferredStoreService) {}
}
