import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { B2BUser } from '@spartacus/core';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ExistUserGuard } from '../guards';

@Component({
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExistUserGuard],
})
export class UserDetailsComponent implements AfterViewInit {
  model$: Observable<B2BUser> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  ngAfterViewInit() {
    console.log('guard check!');
    setTimeout(() => {
      this.existUserGuard.canActivate();
    }, 500);
  }

  constructor(
    protected itemService: OrganizationItemService<B2BUser>,
    protected existUserGuard: ExistUserGuard
  ) {}
}
