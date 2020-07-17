import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfiguratorCommonsService } from '@spartacus/core';
import {
  ConfigRouterExtractorService,
  MessageConfig,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const updateMessageElementId = 'cx-config-update-message';

@Component({
  selector: 'cx-config-message',
  templateUrl: './config-message.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ConfigMessageComponent implements OnInit, OnDestroy {
  changesInProgress = false;
  subscription: Subscription = new Subscription();
  hasPendingChanges$: Observable<
    boolean
  > = this.configRouterExtractorService.extractRouterData().pipe(
    switchMap((routerData) => {
      return this.configuratorCommonsService
        .hasPendingChanges(routerData.owner)
        .pipe(
          switchMap((hasPendingChanges) =>
            this.configuratorCommonsService
              .isConfigurationLoading(routerData.owner)
              .pipe(map((isLoading) => hasPendingChanges || isLoading))
          )
        );
    })
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfigRouterExtractorService,
    protected config: MessageConfig
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.hasPendingChanges$.subscribe((hasPendingChangesOrIsLoading) =>
        this.showUpdateMessage(hasPendingChangesOrIsLoading)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected showUpdateMessage(hasPendingChangesOrIsLoading: boolean): void {
    const updateMessageElement = document.getElementById(
      updateMessageElementId
    );

    if (hasPendingChangesOrIsLoading) {
      this.changesInProgress = true;

      setTimeout(() => {
        //Only show the message if the changes are still in progress
        //When the update/loading is already finished, do not show the message
        if (this.changesInProgress) {
          updateMessageElement.classList.remove('d-none');
        }
      }, this.config?.updateConfigurationMessage?.waitingTime || 1000);
    } else {
      this.changesInProgress = false;
      updateMessageElement.classList.add('d-none');
    }
  }
}
