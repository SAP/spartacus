import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { B2BUser } from '@spartacus/core';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';

@Component({
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  model$: Observable<B2BUser>;

  ngOnInit() {
    this.model$ = this.itemService.key$.pipe(
      switchMap((code) => this.itemService.load(code)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  constructor(protected itemService: OrganizationItemService<B2BUser>) {}
}
