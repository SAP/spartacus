import {  Component, OnInit, Optional } from '@angular/core';
import { CxDatePipe, FeatureConfigService, OccEndpointsService, RoutingService, TranslationService, UserIdService} from '@spartacus/core';
import result from 'postcss/lib/result';
import { BehaviorSubject, Observable } from 'rxjs';
import {  mergeMap } from 'rxjs/operators';
import { finalOrder } from '../cdp-order/model/order/finalOrder';
import { order } from '../cdp-order/model/orderDetail/order';
import { product } from '../cdp-order/model/ImageDetail/product';
import { cdpOrderAdapter } from '../cdp-order/adapter/cdp-order-adapter';
import { OrderHistoryFacade, OrderHistoryList, ReplenishmentOrderHistoryFacade } from '@spartacus/order/root';
import { OrderHistoryComponent } from '@spartacus/order/components';

@Component({
  selector: 'cx-cdp-body',
  templateUrl: './cdp-my-account.component.html',
  styleUrls: ['./cdp-my-account.component.scss'],
  providers: [CxDatePipe],
})

export class CdpMyAccountComponent extends OrderHistoryComponent implements OnInit{

  orders: OrderHistoryList | undefined;

  constructor(
    protected routing: RoutingService,
    protected orderHistoryFacade: OrderHistoryFacade,
    protected translation: TranslationService,
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
    private userIdService: UserIdService,
    private cdpOrderAdapter: cdpOrderAdapter,
    protected occEndpointsService: OccEndpointsService,
    protected datePipe: CxDatePipe,
    @Optional() protected featureConfigService?: FeatureConfigService
  ) {
    super(routing,orderHistoryFacade,translation,replenishmentOrderHistoryFacade);
  }

  result: finalOrder={orders:[]};
  totalPrice: number=0;
  totalItem: number[]=[];
  orderDetail: Record<string,order>={};
  orderedItems: Record<string,number>={};
  i: number=0;
  output: result;
  orderStatus: Record<string,Record<string,number>>={};
  orderImage: Record<string,product[]>={};
  userId: string;
  tabTitleParam$=new BehaviorSubject(0);
  public loading$ = new BehaviorSubject<boolean>(true);


  // orders$ = this.userIdService.takeUserId().pipe(switchMap((userId) => this.cdpOrderAdapter.getOrder(userId)));

  private P_SIZE = 3;
  sortType: string;
  hasPONumber: boolean | undefined;

  orders$: Observable<OrderHistoryList | undefined> = this.orderHistoryFacade
    .getOrderHistoryList(this.P_SIZE);

  ngOnInit(): void {
    this.getMyData();
  }

  public getMyData(): void{

  this.orders$.subscribe((res)=>{
    this.orders=res;
    this.getOrderedItems(this.orders);
  });

  }


  public async getOrderedItems(orders: any): Promise<void>{

    for(let order of orders.orders)
    {
      await this.userIdService.takeUserId().pipe(mergeMap((userId)=> this.cdpOrderAdapter.getOrderDetail(userId,order))).toPromise().then( data=>{
        this.orderDetail[order.code]=data;
        //orderDetail->order
      });
    }
    this.getDetail();
    console.log(this.orderDetail);
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

          this.orderStatus[orderCode][ord.status] =
            this.orderStatus[orderCode][ord.status] + entr.quantity;
            if(entr.orderEntry.product && entr.orderEntry.product.images)
            {
              // console.log("img", entr.orderEntry.product.images[0]);
              entr.orderEntry.product.images.forEach((img)=>{
                img.url =
                        this.occEndpointsService.getBaseUrl({
                          prefix: false,
                          baseSite: false,
                        }) + img.url;
              });
              this.orderImage[orderCode].push(entr.orderEntry.product);
            }
        });
      });
      this.loading$.next(false);
    }
    console.log(this.orderImage);
  }

}
