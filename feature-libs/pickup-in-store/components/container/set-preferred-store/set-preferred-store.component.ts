import { Component, Input } from '@angular/core';
import {
  PointOfServiceNames,
  PreferredStoreService,
} from '@spartacus/pickup-in-store/core';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-set-preferred-store',
  templateUrl: './set-preferred-store.component.html',
})
export class SetPreferredStoreComponent {
  readonly ICON_TYPE = ICON_TYPE;
  @Input() pointOfServiceName: PointOfServiceNames;
  public storeSelected$ = this.preferredStoreService.getPreferredStore$();

  constructor(protected preferredStoreService: PreferredStoreService) {}

  setAsPreferred() {
    this.preferredStoreService.setPreferredStore(this.pointOfServiceName);
  }
}
