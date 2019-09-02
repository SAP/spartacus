import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-config-form',
  templateUrl: './configuration-form.component.html',
})
export class ConfigurationFormComponent implements OnInit, OnDestroy {
  pcCode$: Observable<string>;
  constructor(private routingService: RoutingService) {}

  ngOnInit(): void {
    this.pcCode$ = this.routingService
      .getRouterState()
      .pipe(map(routingData => routingData.state.params.pcCode));
  }

  ngOnDestroy(): void {}
}
