import { Injectable, ViewContainerRef } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
} from '../../../layout/launch-dialog/index';

@Injectable({
  providedIn: 'root',
})
export class ProductImagesComponentService {
  constructor(protected launchDialogService: LaunchDialogService) {}

  expandImage(vcr: ViewContainerRef): Observable<any> | undefined {
    const component = this.launchDialogService.launch(
      LAUNCH_CALLER.IMAGE_ZOOM,
      vcr
    );
    if (component) {
      return combineLatest([
        component,
        this.launchDialogService.dialogClose,
      ]).pipe(
        filter(([, close]) => close && close !== undefined),
        tap(([comp]) => {
          this.launchDialogService.clear(LAUNCH_CALLER.IMAGE_ZOOM);
          comp.destroy();
        })
      );
    }
  }
}
