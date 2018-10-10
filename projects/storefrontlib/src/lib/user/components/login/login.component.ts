import {
  Component,
  OnDestroy,
  OnInit,
  ElementRef,
  Renderer2
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { UserToken } from '../../../auth/models/token-types.model';

import * as fromStore from '../../store';
import { AuthService } from '../../../auth/facade/auth.service';
import { RoutingService } from '../../../routing/facade/routing.service';

@Component({
  selector: 'y-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user$: Observable<any>;
  isLogin = false;

  subscription: Subscription;
  routingSub: Subscription;

  constructor(
    private auth: AuthService,
    private routing: RoutingService,
    private store: Store<fromStore.UserState>,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.renderer.listen(this.elementRef.nativeElement, 'click', event => {
      event.preventDefault();
      event.stopPropagation();

      const target = event.target || event.srcElement;
      if (
        target.attributes['class'] &&
        target.attributes['class'].nodeValue === 'y-navigation__child-link' &&
        target.attributes.href === undefined
      ) {
        this.logout();
      }
    });
  }

  ngOnInit() {
    this.user$ = this.store.pipe(select(fromStore.getDetails));

    this.subscription = this.auth.userToken$.subscribe((token: UserToken) => {
      if (token && token.access_token && !this.isLogin) {
        this.isLogin = true;
        this.store.dispatch(new fromStore.LoadUserDetails(token.userId));
        this.auth.login();
      } else if (token && !token.access_token && this.isLogin) {
        this.isLogin = false;
      }
    });
  }

  logout() {
    this.isLogin = false;
    this.auth.logout();

    let state = this.route.snapshot;
    while (state.firstChild) {
      state = state.firstChild;
    }

    if (
      state.routeConfig.canActivate &&
      state.routeConfig.canActivate.find(
        child => child.GUARD_NAME === 'AuthGuard'
      )
    ) {
      this.routing.go(['/login']);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routingSub) {
      this.routingSub.unsubscribe();
    }
  }
}
