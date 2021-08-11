import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {CartModificationList, CartValidationFacade} from '@spartacus/cart/validation/root';
import {map} from "rxjs/operators";
import {UserIdService, ActiveCartService, CartModification} from '@spartacus/core';


@Component({
  selector: 'cx-cart-validation-cart-warnings',
  templateUrl: './cart-validation-cart-warnings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartValidationCartWarningsComponent implements OnInit {

  cartModifications$: Observable<CartModification[]> = this.cartValidationService.getCartValidationStatus().pipe(
    map((modificationList: CartModificationList) => {
      console.log(modificationList);
      return modificationList.cartModifications;
    })
  );

  constructor(
    protected cartValidationService: CartValidationFacade,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartService) {
  }

  ngOnInit(): void {
  }

}
