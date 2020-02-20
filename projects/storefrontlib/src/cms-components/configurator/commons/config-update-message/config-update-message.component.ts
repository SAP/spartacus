import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfiguratorCommonsService, RoutingService } from '@spartacus/core';
import { switchMap } from 'rxjs/operators';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';

const updateMessageElementId = 'cx-config-update-message';

@Component({
  selector: 'cx-config-update-message',
  templateUrl: './config-update-message.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ConfigUpdateMessageComponent implements OnInit {
  changesInProgress = false;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  ngOnInit(): void {
    this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap(owner =>
          this.configuratorCommonsService.hasPendingChanges(owner)
        )
      )
      .subscribe(hasPendingChanges =>
        this.showUpdateMessage(hasPendingChanges.valueOf())
      );
  }

  showUpdateMessage(hasPendingChanges: boolean): void {
    const updateMessageElement = document.getElementById(
      updateMessageElementId
    );

    if (hasPendingChanges) {
      this.changesInProgress = true;

      setTimeout(() => {
        //Only show the message if the changes are still in progress
        //When the update is already finished, do not show the update message
        if (this.changesInProgress) {
          updateMessageElement.classList.remove('d-none');
        }
      }, 1000); //TODO: Make waiting before showing banner configurable
    } else {
      this.changesInProgress = false;
      updateMessageElement.classList.add('d-none');
    }
  }
}
