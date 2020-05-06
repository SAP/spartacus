import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { Permission, PermissionService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-permission-details',
  templateUrl: './permission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionDetailsComponent implements OnInit {
  permission$: Observable<Permission>;
  permissionCode$: Observable<
    string
  > = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected permissionsService: PermissionService,
    protected modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.permission$ = this.permissionCode$.pipe(
      tap((code) => this.permissionsService.loadPermission(code)),
      switchMap((code) => this.permissionsService.get(code)),
      filter(Boolean),
      map((permission: Permission) => ({
        ...permission,
      }))
    );
  }

  update(permission: Permission) {
    this.permissionCode$
      .pipe(take(1))
      .subscribe((permissionCode) =>
        this.permissionsService.update(permissionCode, permission)
      );
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}
