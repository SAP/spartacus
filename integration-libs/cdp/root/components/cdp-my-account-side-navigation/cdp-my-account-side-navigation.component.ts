/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit } from '@angular/core';
import { AuthService, CmsNavigationComponent, User } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { NavigationNode } from 'projects/storefrontlib/cms-components/navigation/navigation/navigation-node.model';
import { NavigationService } from 'projects/storefrontlib/cms-components/navigation/navigation/navigation.service';
import { CmsComponentData } from 'projects/storefrontlib/cms-structure/page/model/cms-component-data';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-cdp-my-account-side-navigation',
  templateUrl: './cdp-my-account-side-navigation.component.html',
  styleUrls: ['./cdp-my-account-side-navigation.component.scss'],

  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdpMyAccountSideNavigationComponent implements OnInit {
  user$: Observable<User | undefined>;
  node$: Observable<NavigationNode> = this.service.getNavigationNode(
    this.componentData.data$
  );

  styleClass$: Observable<string | undefined> = this.componentData.data$.pipe(
    map((d) => d?.styleClass)
  );

  constructor(
    protected componentData: CmsComponentData<CmsNavigationComponent>,
    protected service: NavigationService,
    protected auth: AuthService,
    protected userAccount: UserAccountFacade
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.isUserLoggedIn().pipe(
      switchMap((isUserLoggedIn) => {
        if (isUserLoggedIn) {
          return this.userAccount.get();
        } else {
          return of(undefined);
        }
      })
    );
  }
}
