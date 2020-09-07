import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { B2BUnit } from '@spartacus/core';
import { ExistUnitGuard } from './exist-unit.guard';

@Injectable({
  providedIn: 'root',
})
export class ActiveUnitGuard extends ExistUnitGuard {
  protected isValid(unit: B2BUnit): boolean {
    return unit.active;
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    const urlPath = this.semanticPathService.transform({
      cxRoute: 'orgUnitDetails',
      params: { code: _urlParams.code },
    });

    return this.router.parseUrl(urlPath.join('/'));
  }
}
