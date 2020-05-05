import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { RoutingService, UserGroup, UserGroupService } from '@spartacus/core';
import { ModalService } from '../../../../shared/components/modal/index';

@Component({
  selector: 'cx-user-group-details',
  templateUrl: './user-group-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGroupDetailsComponent implements OnInit {
  userGroup$: Observable<UserGroup>;
  userGroupCode$: Observable<
    string
  > = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected userGroupsService: UserGroupService,
    protected modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.userGroup$ = this.userGroupCode$.pipe(
      tap((code) => this.userGroupsService.loadUserGroup(code)),
      switchMap((code) => this.userGroupsService.get(code)),
      filter(Boolean),
      map((userGroup: UserGroup) => ({
        ...userGroup,
        code: userGroup.uid,
      }))
    );
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}
