import { ElementRef, Injectable, ViewContainerRef } from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SavedCartFormLaunchDialogService {
  constructor(protected launchDialogService: LaunchDialogService) {}

  openDialog(
    openElement?: ElementRef,
    vcr?: ViewContainerRef,
    data?: any
  ): Observable<any> | undefined {
    const component = this.launchDialogService.launch(
      LAUNCH_CALLER.SAVED_CART,
      vcr,
      data
    );

    if (component) {
      return combineLatest([
        component,
        this.launchDialogService.dialogClose,
      ]).pipe(
        filter(([, close]) => close !== undefined),
        tap(([comp]) => {
          openElement?.nativeElement.focus();
          this.launchDialogService.clear(LAUNCH_CALLER.SAVED_CART);
          comp.destroy();
        }),
        map(([comp]) => comp)
      );
    }
  }
}
