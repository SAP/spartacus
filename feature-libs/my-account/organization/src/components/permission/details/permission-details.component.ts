import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissionService, Permission } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap, shareReplay } from 'rxjs/operators';
import { ModalService } from '@spartacus/storefront';

@Component({
  selector: 'cx-permission-details',
  templateUrl: './permission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionDetailsComponent {
  protected code$: Observable<string> = this.route.params.pipe(
    map((params) => params['code']),
    filter((code) => Boolean(code))
  );

  permission$: Observable<Permission> = this.code$.pipe(
    // TODO: we should do this in the facade
    tap((code) => this.permissionService.loadPermission(code)),
    switchMap((code) => this.permissionService.get(code)),
    shareReplay({ bufferSize: 1, refCount: true }) // we have side effects here, we want the to run only once
  );

  constructor(
    protected route: ActivatedRoute,
    protected permissionService: PermissionService,
    protected modalService: ModalService
  ) {}

  update(permission: Permission) {
    this.permissionService.update(permission.code, permission);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}
