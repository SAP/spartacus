import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'cx-config-previous-next-buttons',
  templateUrl: './config-previous-next-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigPreviousNextButtonsComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;

  constructor(
    private routingService: RoutingService,
    private configuratorGroupsService: ConfiguratorGroupsService,
    private configuratorCommonsService: ConfiguratorCommonsService
  ) {}

  @Output() nextGroup = new EventEmitter();
  @Output() previousGroup = new EventEmitter();

  ngOnInit(): void {
    this.configuration$ = this.routingService.getRouterState().pipe(
      map(routingData => routingData.state.params.rootProduct),
      switchMap(product =>
        this.configuratorCommonsService.getConfiguration(product)
      )
    );
  }

  onPrevious(configId: string, productCode: string) {
    this.navigateToPreviousGroup(configId, productCode);
  }
  onNext(configId: string, productCode: string) {
    this.navigateToNextGroup(configId, productCode);
  }

  navigateToNextGroup(configId: string, productCode: string) {
    this.configuratorGroupsService
      .getNextGroup(productCode)
      .pipe(take(1))
      .subscribe(groupId =>
        this.configuratorGroupsService.navigateToGroup(
          configId,
          productCode,
          groupId
        )
      );
  }

  navigateToPreviousGroup(configId: string, productCode: string) {
    this.configuratorGroupsService
      .getPreviousGroup(productCode)
      .pipe(take(1))
      .subscribe(groupId =>
        this.configuratorGroupsService.navigateToGroup(
          configId,
          productCode,
          groupId
        )
      );
  }

  isFirstGroup(productCode: string): Observable<Boolean> {
    return this.configuratorGroupsService
      .getPreviousGroup(productCode)
      .pipe(map(group => !group));
  }

  isLastGroup(productCode: string): Observable<Boolean> {
    return this.configuratorGroupsService
      .getNextGroup(productCode)
      .pipe(map(group => !group));
  }
}
