import { Component, OnInit} from '@angular/core';
//import { CurrentProductService } from '@spartacus/core';
import { ProductService, ProductScope, RoutingService} from '@spartacus/core'; 
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';



@Component({
  selector: 'cx-bulk-pricing-table',
  templateUrl: './bulk-pricing-table.component.html'
})
export class BulkPricingTableComponent implements OnInit {

  bulkPrices: any;
  productCode: string;
  protected readonly DEFAULT_PRODUCT_SCOPE = ProductScope.DETAILS;


  constructor(
    private productService: ProductService, 
    private routingService: RoutingService) { }

  ngOnInit(): void {
    
    let tier1 = {
      "min": "1",
      "max": "3",
      "price": "$1.00", 
      "discount" : "10%"
    }

    let tier2 = {
      "min": "4",
      "max": "6",
      "price": "$0.80", 
      "discount" : "12.5%"
    }

    let tier3 = {
      "min": "7",
      "max": "10",
      "price": "$0.50", 
      "discount" : "15%"
    }

    let prices = [];
    prices.push(tier1); 
    prices.push(tier2);
    prices.push(tier3);

    this.bulkPrices = prices;

    this.loadProduct().subscribe(
      (item) => {
          console.log({item});
          //this.bulkPrices = [];
          alert("Done");
      }
    );



  }


  //use when /product includes volumeprices
  loadProduct(): Observable<any>{
    return this.routingService.getRouterState().pipe(
      map((state) => state.state.params['productCode']),
      distinctUntilChanged(),
      switchMap((productCode: string) => {
        return productCode
          ? this.productService.get(
              productCode,
              this.DEFAULT_PRODUCT_SCOPE
            )
          : of(null);
      }),
      filter((product) => product !== undefined)
    );
  }

  //Temp: make an additional call to orgProduct
  loadPrices(){

  }




}
