import { Route } from '@angular/router';

export interface ConfigurableRoute {
  defaultPath: string;
  route: Route;
}
export interface ConfigurableRoutes {
  cart?: ConfigurableRoute;
  search?: ConfigurableRoute;
  login?: ConfigurableRoute;
  register?: ConfigurableRoute;
  resetNewPassword?: ConfigurableRoute;
  resetPassword?: ConfigurableRoute;
  checkout?: ConfigurableRoute;
  orderConfirmation?: ConfigurableRoute;
  products?: ConfigurableRoute;
  storeFinder?: ConfigurableRoute;

  // myAccount pages
  myAccount?: {
    orders?: ConfigurableRoute;
    paymentMethods?: ConfigurableRoute;
  };

  // content pages:
  contact?: ConfigurableRoute;
  help?: ConfigurableRoute;
  sale?: ConfigurableRoute;
}
