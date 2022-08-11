import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileTagInjectorService } from '../services/profile-tag.injector.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-profiletag',
  template: `
    <ng-container *ngIf="profileTagEnabled$ | async"></ng-container>
  `,
})
export class ProfileTagComponent {
  profileTagEnabled$: Observable<boolean> = this.profileTagInjector.track();
  constructor(private profileTagInjector: ProfileTagInjectorService) {}
}
