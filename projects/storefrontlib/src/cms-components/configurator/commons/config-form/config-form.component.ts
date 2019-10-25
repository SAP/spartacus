import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

@Component({
  selector: 'cx-config-form',
  templateUrl: './config-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFormComponent implements OnInit, OnDestroy {
  configuration$: Observable<Configurator.Configuration>;
  currentGroup$: Observable<string>;
  productCode: string;
  subscription = new Subscription();
  public UiType = Configurator.UiType;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configuratorGroupsService: ConfiguratorGroupsService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .subscribe(state => this.initConfigurationForm(state))
    );
  }

  initConfigurationForm(routingData) {
    this.productCode = routingData.state.params.rootProduct;

    this.configuration$ = this.configuratorCommonsService.getConfiguration(
      this.productCode
    );
    this.currentGroup$ = this.configuratorGroupsService.getCurrentGroup(
      this.productCode
    );
  }

  updateConfiguration(event) {
    this.configuratorCommonsService.updateConfiguration(
      this.productCode,
      event.group,
      event.changedAttribute
    );
  }

  navigateToNextGroup() {
    this.configuratorGroupsService
      .getNextGroup(this.productCode)
      .pipe(take(1))
      .subscribe(groupId => {
        this.configuratorGroupsService.setCurrentGroup(
          this.productCode,
          groupId
        );
      });
  }

  navigateToPreviousGroup() {
    this.configuratorGroupsService
      .getPreviousGroup(this.productCode)
      .pipe(take(1))
      .subscribe(groupId => {
        this.configuratorGroupsService.setCurrentGroup(
          this.productCode,
          groupId
        );
      });
  }

  isFirstGroup(): Observable<Boolean> {
    return this.configuratorGroupsService
      .getPreviousGroup(this.productCode)
      .pipe(
        mergeMap(group => {
          if (!group) {
            return of(true);
          } else {
            return of(false);
          }
        })
      );
  }

  isLastGroup(): Observable<Boolean> {
    return this.configuratorGroupsService.getNextGroup(this.productCode).pipe(
      mergeMap(group => {
        if (!group) {
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
