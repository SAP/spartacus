import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { UnitRoleType } from '../../components/shared';

@Injectable({
  providedIn: 'root',
})
export class B2bIsAdminGuard implements CanActivate {
  constructor(protected userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.userService.get().pipe(
      pluck('roles'),
      map((roles: string[]) =>
        roles && roles.length
          ? !!roles.find((r) => r === UnitRoleType.ADMIN)
          : false
      )
    );
  }
}
