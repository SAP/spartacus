import {Injectable} from '@angular/core';
import {CheckoutConfig} from "../config";
import {CheckoutStep} from "../model";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {getBaseSiteData} from "../../../../../core/src/site-context/store/selectors/base-site.selectors";
import {BaseSite} from "../../../../../core/src/model";

@Injectable({
  providedIn: 'root',
})
export class CheckoutFlowConfigService {
  private checkoutGroup: string;

  constructor(
    private checkoutConfig: CheckoutConfig,
    private store: Store // I just need

  ) {
    this.store.select( getBaseSiteData ).pipe(
      map( (site: BaseSite) => this.checkoutGroup = site.stores[0].checkoutGroup )
    );
  }

  getSteps(): CheckoutStep[] {
    return this.checkoutGroup
      && this.checkoutConfig.checkout.groups[this.checkoutGroup]
      || this.checkoutConfig.checkout.steps
      || [];
  }

}
