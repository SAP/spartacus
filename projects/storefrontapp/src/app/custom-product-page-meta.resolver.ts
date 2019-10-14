import { Injectable } from '@angular/core';
import { ProductPageMetaResolver } from '@spartacus/core';
import { Observable } from 'rxjs';

/**
 * Demonstrates page meta resolver for the login page.
 * In this example we add a page resolver, and connect the
 * page resolver to the pageTemplate.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomProductPageMetaResolver extends ProductPageMetaResolver {
  resolve(): Observable<string> {
    console.log('this is a custom resolver');
    return super.resolve();
  }
}
