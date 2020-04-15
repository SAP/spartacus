import {
  ComponentRef,
  ElementRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, take, tap } from 'rxjs/operators';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
} from '../../layout/launch-dialog/index';

interface DialogData {
  openElement?: ElementRef;
  vcr?: ViewContainerRef;
}

@Injectable({ providedIn: 'root' })
export class AnonymousConsentLaunchDialogService {
  constructor(protected launchDialogService: LaunchDialogService) {}

  openDialog(data: DialogData): Observable<ComponentRef<any> | boolean> {
    const component = this.launchDialogService.launch(
      'ANONYMOUS_CONSENT' as LAUNCH_CALLER,
      data.vcr
    );

    if (component) {
      return (component as Observable<ComponentRef<any>>).pipe(
        concatMap((comp) => {
          return (comp.instance.closeDialog as Observable<boolean>).pipe(
            tap(() => {
              data.openElement?.nativeElement.focus();
              this.launchDialogService.clear(
                'ANONYMOUS_CONSENT' as LAUNCH_CALLER
              );
              comp.destroy();
            })
          );
        }),
        take(1)
      );
    }
  }
}
