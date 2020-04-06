import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfiguratorCommonsService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';
import { MessageConfig } from '../config/message-config';

const updateMessageElementId = 'cx-config-update-message';

@Component({
  selector: 'cx-config-message',
  templateUrl: './config-message.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ConfigMessageComponent implements OnInit {
  changesInProgress = false;
  hasPendingChanges$: Observable<Boolean>;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configRouterExtractorService: ConfigRouterExtractorService,
    private config: MessageConfig
  ) {}

  ngOnInit(): void {
    this.hasPendingChanges$ = this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap((owner) => {
          return this.configuratorCommonsService
            .hasPendingChanges(owner)
            .pipe(
              switchMap((hasPendingChanges) =>
                this.configuratorCommonsService
                  .configurationIsLoading(owner)
                  .pipe(map((isLoading) => hasPendingChanges || isLoading))
              )
            );
        })
      );

    this.hasPendingChanges$.subscribe((hasPendingChangesOrIsLoading) =>
      this.showUpdateMessage(hasPendingChangesOrIsLoading.valueOf())
    );
  }

  showUpdateMessage(hasPendingChangesOrIsLoading: boolean): void {
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
