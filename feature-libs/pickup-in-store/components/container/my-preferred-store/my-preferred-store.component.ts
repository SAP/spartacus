import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-my-preferred-store',
  templateUrl: 'my-preferred-store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyPreferredStoreComponent implements OnInit {
  constructor(private preferredStoreService: PreferredStoreService) {}

  ngOnInit(): void {
    console.log(
      this.preferredStoreService.getPreferredStore$().pipe(
        tap((store) => {
          console.log('store', store);
        })
      )
    );
  }
}
