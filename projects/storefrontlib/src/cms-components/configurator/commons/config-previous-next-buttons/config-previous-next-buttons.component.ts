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
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-config-previous-next-buttons',
  templateUrl: './config-previous-next-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigPreviousNextButtonsComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;
  ready$: Observable<boolean>;

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
      ),
      tap(configuration => {
        this.ready$ = this.configuratorCommonsService.isConfigurationReady(
          configuration.productCode
        );
      })
    );
  }

  onPrevious(productCode: string) {
    this.navigateToPreviousGroup(productCode);
  }
  onNext(productCode: string) {
    this.navigateToNextGroup(productCode);
  }

  navigateToNextGroup(productCode: string) {
    this.configuratorGroupsService
      .getNextGroup(productCode)
      .pipe(take(1))
      .subscribe(groupId => this.readWhenReady(groupId, productCode));
  }

  navigateToPreviousGroup(productCode: string) {
    this.configuratorGroupsService
      .getPreviousGroup(productCode)
      .pipe(take(1))
      .subscribe(groupId => this.readWhenReady(groupId, productCode));
  }

  readWhenReady(groupId: string, productCode: string) {
    this.readConfigurationForGroup(groupId, productCode)
      .pipe(
        switchMap(_configuration =>
          this.configuratorCommonsService.isConfigurationReady(productCode)
        ),
        filter(ready => ready),
        tap(_ready =>
          this.configuratorGroupsService.setCurrentGroup(productCode, groupId)
        ),
        take(1)
      )
      .subscribe();
  }

  readConfigurationForGroup(
    groupId: string,
    productCode: string
  ): Observable<Configurator.Configuration> {
    return this.configuration$.pipe(
      take(1),
      switchMap(config =>
        this.configuratorCommonsService.readConfiguration(
          config.configId,
          productCode,
          groupId
        )
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
