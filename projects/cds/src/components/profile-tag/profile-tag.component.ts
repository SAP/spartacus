import { Component, OnInit } from '@angular/core';
import { ProfileTagInjector } from './profile-tag.injector';

@Component({
    selector: 'cx-profiletag',
    template: `
    <ng-container *ngIf="profileTagEnabled$ | async"></ng-container>
  `,
})
export class ProfileTagComponent implements OnInit {
    profileTagEnabled$ = this.profileTagInjector.start();
    constructor(private profileTagInjector: ProfileTagInjector) {
        console.log('starting');
    }
    ngOnInit(): void {
        console.log('cx-profiletag oninit!')
    }
}
