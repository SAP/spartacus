import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { OccCartService } from "../occ/occ-core/cart.service";
import { CartModelService } from "./cart-model.service";
import { TokenService } from "./token.service";

const ANOYMOUS_USERNAME = "anonymous";

@Injectable()
export class CartLoaderService {
  // We keep a few tokens in order to mange the cart and update subscribers
  username: string;
  cartToken: string;

  constructor(
    protected tokenService: TokenService,
    protected occCartService: OccCartService,
    protected cartModelService: CartModelService
  ) {
    this.initCart();
  }

  initCart() {
    // subsribe to the userToken, any changes (login/out) will force a (re)loading of the cart
    // whenever there's an existing cart, we'll merge the cart to the user
    this.tokenService.getUserToken().subscribe(userToken => {
      this.username =
        userToken && userToken.username
          ? userToken.username
          : ANOYMOUS_USERNAME;
      if (userToken) {
        this.cartToken ? this.mergeCart() : this.loadLatestCart();
      }
    });

    //  subscribe to the cartToken, any changes will force a refresh of the cart
    this.tokenService.getCartToken().subscribe(cartToken => {
      if (cartToken) {
        this.cartToken = cartToken;
        this.refreshCart(cartToken);
      } else {
        this.cartToken = null;
        this.cartModelService.clearCart();
      }
    });
  }

  addCartEntry(productCode: string, quantity: number) {
    if (this.hasCart()) {
      this.addProductToCart(productCode, quantity);
    } else {
      // first time we need to create a cart
      this.createCart(
        function(cartData) {
          this.setCartToken(cartData);
          this.addProductToCart(productCode, quantity);
        }.bind(this)
      );
    }
  }

  removeCartEntry(entry) {
    this.occCartService
      .remove(this.username, this.cartToken, entry.entryNumber)
      .subscribe(
        cartEntryData => {
          this.cartModelService.storeEntry(entry.product.code, cartEntryData);
        },
        error => console.log(error),
        () => this.refreshCart(this.cartToken)
      );
  }

  private loadLatestCart() {
    if (!this.username || this.username === ANOYMOUS_USERNAME) {
      return;
    }
    // TODO: what if we have cart token...
    this.occCartService.loadLatestCart(this.username).subscribe(latestCart => {
      this.setCartToken(latestCart);
    });
  }

  // merge the cart for users who have just logged in
  private mergeCart() {
    this.occCartService.loadLatestCart(this.username).subscribe(latestCart => {
      this.occCartService
        .mergeCartWithLatestCart(this.username, this.cartToken, latestCart)
        .subscribe(cartData => {
          this.setCartToken(cartData);
        });
    });
  }

  private refreshCart(cartToken: string) {
    this.occCartService.loadCart(this.username, cartToken).subscribe(
      cartData => {
        this.storeCartInModel(cartData);
      },
      error => console.log(error)
    );
  }

  private storeCartInModel(cartData) {
    this.cartModelService.storeCart(cartData);

    if (cartData.entries) {
      for (const entry of cartData.entries) {
        // update the model for each entry so that cart entry related components
        // got notified (i.e. quantity per product)
        this.cartModelService.storeEntry(entry.product.code, entry);
      }
    }
  }

  private createCart(callback?: Function) {
    this.occCartService.createCart(this.username).subscribe(
      cartData => {
        if (callback) {
          callback(cartData);
        }
      },
      error => console.log(error)
    );
  }

  private addProductToCart(productCode: string, quantity: number) {
    this.occCartService
      .add(this.username, this.cartToken, productCode, quantity)
      .subscribe(
        cartEntryData => {
          this.refreshCart(this.cartToken);
        },
        error => console.log(error)
      );
  }

  private hasCart(): boolean {
    return !!this.cartToken;
  }

  private setCartToken(cart) {
    if (!cart) {
      this.cartToken = null;
    } else {
      this.cartToken =
        this.username === ANOYMOUS_USERNAME ? cart.guid : cart.code;
    }
    this.tokenService.storeCartToken(this.cartToken);
  }
}
