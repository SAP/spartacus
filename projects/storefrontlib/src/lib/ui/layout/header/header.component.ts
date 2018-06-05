import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromAuthStore from '../../../authorization/store';

@Component({
  selector: 'y-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<fromAuthStore.TrustedClientTokenState>) {}

  ngOnInit() {
    // Authenticate the application since this component always loads
    this.store.dispatch(new fromAuthStore.LoadTrustedClientToken());
  }
}
