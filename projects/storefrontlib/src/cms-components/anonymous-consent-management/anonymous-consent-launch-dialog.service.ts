import { ElementRef, Injectable, ViewContainerRef } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
} from '../../layout/launch-dialog/index';

@Injectable({ providedIn: 'root' })
export class AnonymousConsentLaunchDialogService {
  constructor(protected launchDialogService: LaunchDialogService) {}

  openDialog(
    openElement?: ElementRef,
    vcr?: ViewContainerRef
  ): Observable<any> | undefined {
    const component = this.launchDialogService.launch(
      LAUNCH_CALLER.ANONYMOUS_CONSENT,
      vcr
    );

    if (component) {
      return combineLatest([
        component,
        this.launchDialogService.dialogClose,
      ]).pipe(
        filter(([, close]) => close && close !== undefined),
        tap(([comp]) => {
          openElement?.nativeElement.focus();
          this.launchDialogService.clear(LAUNCH_CALLER.ANONYMOUS_CONSENT);
          comp.destroy();
        }),
        map(([comp]) => comp)
      );
    }
  }
}
