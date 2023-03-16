import {  Component, OnInit } from '@angular/core';
import { CxDatePipe, OccEndpointsService, RoutingService, UserIdService} from '@spartacus/core';
import result from 'postcss/lib/result';
import { BehaviorSubject } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { finalOrder } from '../cdp-order/model/order/finalOrder';
import { order } from '../cdp-order/model/orderDetail/order';
import { product } from '../cdp-order/model/ImageDetail/product';
import { cdpOrderAdapter } from '../cdp-order/adapter/cdp-order-adapter';

@Component({
  selector: 'cx-cdp-body',
  templateUrl: './cdp-my-account.component.html',
  styleUrls: ['./cdp-my-account.component.scss'],
  providers: [CxDatePipe],
})

export class CdpMyAccountComponent implements OnInit{

  constructor(private userIdService: UserIdService,private cdpOrderAdapter: cdpOrderAdapter,protected datePipe: CxDatePipe,protected routing: RoutingService,protected occEndpointsService: OccEndpointsService){}

  result: finalOrder={orders:[]};
  totalPrice: number=0;
  totalItem: number[]=[];
  orderDetail: Record<string,order>={};
  orderedItems: Record<string,number>={};
  i: number=0;
  url: any;
  output: result;
  orderStatus: Record<string,Record<string,number>>={};
  orderImage: Record<string,product[]>={};
  userId: string;
  tabTitleParam$=new BehaviorSubject(0);
  public loading$ = new BehaviorSubject<boolean>(true);


  orders$ = this.userIdService.takeUserId().pipe(switchMap((userId) => this.cdpOrderAdapter.getOrder(userId)));

  ngOnInit(): void {
    this.getMyData();
  }

  public getMyData(): void{

  this.orders$.subscribe((res)=>{
    this.result=res;
    this.tabTitleParam$.next(res.orders.length-res.orders.length+2);
    this.calculateTotalAmount(this.result);
    this.getOrderedItems(this.result);
  });

  }

  public calculateTotalAmount(finalResult: finalOrder): void{

    for(var val of finalResult.orders)
    {
      this.totalPrice = val.total.value + this.totalPrice;
      console.log(this.totalPrice);
    }
  }

  public async getOrderedItems(finalResult: finalOrder): Promise<void>{

    for(let order of finalResult.orders)
    {
      await this.userIdService.takeUserId().pipe(mergeMap((userId)=> this.cdpOrderAdapter.getOrderDetail(userId,order))).toPromise().then( data=>{
        this.orderDetail[order.code]=data;
        //orderDetail->order
      });
    }
    this.getDetail();
  }

  public async getDetail() {

    this.loading$.next(true);
    // eslint-disable-next-line guard-for-in
    for (let orderCode in this.orderDetail) {
      this.orderStatus[orderCode] ??= {};
      this.orderImage[orderCode]??=[];
      this.orderDetail[orderCode].consignments.forEach((ord) => {
        this.orderStatus[orderCode][ord.status] ??= 0;
        ord.entries.forEach((entr) => {
          console.log(orderCode + ' status ' + ord.status + entr.quantity);
          this.orderStatus[orderCode][ord.status] =
            this.orderStatus[orderCode][ord.status] + entr.quantity;
            if(entr.orderEntry.product && entr.orderEntry.product.images)
            {
            //   entr.orderEntry.product.images.forEach((img)=>{
            //     img.url =
            //             this.occEndpointsService.getBaseUrl({
            //               prefix: false,
            //               baseSite: false,
            //             }) + img.url;
            //   });
            //   this.orderImage[orderCode].push(entr.orderEntry.product);

            this.url = entr.orderEntry.product.images[0];
            this.url = this.occEndpointsService.getBaseUrl({
                            prefix: false,
                            baseSite: false,
                          }) + this.url;
                          this.orderImage[orderCode].push(entr.orderEntry.product);
            }
        });
      });
      this.loading$.next(false);
    }
    console.log(this.orderImage);
  }
}
