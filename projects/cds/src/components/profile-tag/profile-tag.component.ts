import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Event as NgRouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileTagInjector } from './profile-tag.injector';
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cx-profiletag',
    template: `
    <ng-container *ngIf="profileTagEnabled$ | async"></ng-container>
  `,
})
export class ProfileTagComponent implements OnInit {
    profileTagEnabled$: Observable<Boolean | NgRouterEvent>;
    constructor(private profileTagInjector: ProfileTagInjector) {
        this.profileTagEnabled$ = this.profileTagInjector.injectScript();
        console.log('starting');
    }
    ngOnInit(): void {
        console.log('cx-profiletag oninit!')
    }
}
