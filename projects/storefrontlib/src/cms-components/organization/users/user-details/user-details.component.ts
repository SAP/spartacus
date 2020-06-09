import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap, take } from 'rxjs/operators';
import { RoutingService, B2BUser, B2BUserService } from '@spartacus/core';
import { ModalService } from '../../../../shared/components/modal/modal.service';

@Component({
  selector: 'cx-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2BUserDetailsComponent implements OnInit {
  b2bUser$: Observable<B2BUser>;
  b2bUserCode$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected b2bUsersService: B2BUserService,
    protected modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.b2bUser$ = this.b2bUserCode$.pipe(
      tap((code) => this.b2bUsersService.loadB2BUser(code)),
      switchMap((code) => this.b2bUsersService.get(code)),
      filter(Boolean),
      map((b2bUser: B2BUser) => ({
        ...b2bUser,
        code: b2bUser.uid,
      }))
    );
  }

  update(b2bUser: B2BUser) {
    this.b2bUserCode$
      .pipe(take(1))
      .subscribe((code) => this.b2bUsersService.update(code, b2bUser));
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}
