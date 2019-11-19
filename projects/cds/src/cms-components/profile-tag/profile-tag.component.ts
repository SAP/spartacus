import { ChangeDetectionStrategy, Component, Renderer2 } from '@angular/core';
import { Event as NgRouterEvent } from '@angular/router';
import { AnonymousConsent } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ProfileTagInjector } from '../../profiletag/profile-tag.injector';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-profiletag',
  template: `
    <ng-container *ngIf="profileTagEnabled$ | async"></ng-container>
  `,
})
export class ProfileTagComponent {
  profileTagEnabled$: Observable<AnonymousConsent | NgRouterEvent>;
  constructor(
    private profileTagInjector: ProfileTagInjector,
    private renderer2: Renderer2
  ) {
    this.profileTagInjector.addScript(this.renderer2);
    this.profileTagEnabled$ = this.profileTagInjector.injectScript();
  }
}
