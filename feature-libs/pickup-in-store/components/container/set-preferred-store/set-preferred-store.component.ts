import { Component, Input, OnInit } from '@angular/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-set-preferred-store',
  templateUrl: './set-preferred-store.component.html',
})
export class SetPreferredStoreComponent implements OnInit {
  readonly ICON_TYPE = ICON_TYPE;
  @Input() storeName: string;

  public preferredStoreStatus: string = 'Make This My Store';
  public storeSelected = false;

  constructor(protected preferredStoreService: PreferredStoreService) {}

  ngOnInit(): void {
    this.preferredStoreService
      .getPreferredStore$()
      .pipe(
        tap((store) => (this.storeSelected = this.storeName === store?.name))
      )
      .subscribe();
  }

  setAsPreferred() {
    console.log(this.storeName);
  }
}
