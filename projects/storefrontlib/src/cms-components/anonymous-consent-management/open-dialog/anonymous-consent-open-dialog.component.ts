import {
  Component,
  ComponentRef,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { concatMap, take, tap } from 'rxjs/operators';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
} from '../../../layout/launch-dialog/index';

@Component({
  selector: 'cx-anonymous-consent-open-dialog',
  templateUrl: './anonymous-consent-open-dialog.component.html',
})
export class AnonymousConsentOpenDialogComponent implements OnDestroy {
  @ViewChild('open') openElement: ElementRef;

  private subscription = new Subscription();

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  openDialog(): void {
    const component = this.launchDialogService.launch(
      LAUNCH_CALLER.ANONYMOUS_CONSENT,
      this.vcr
    );
    if (component) {
      this.subscription.add(
        (component as Observable<ComponentRef<any>>)
          .pipe(
            concatMap((comp) => {
              return comp.instance.closeDialog.pipe(
                tap(() => {
                  this.openElement.nativeElement.focus();
                  this.launchDialogService.clear(
                    LAUNCH_CALLER.ANONYMOUS_CONSENT
                  );
                  comp.destroy();
                })
              );
            }),
            take(1)
          )
          .subscribe()
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
