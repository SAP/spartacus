import { Component, OnInit} from '@angular/core';
import { CxDatePipe, UserIdService } from '@spartacus/core';
//import { Observable } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { cdpOrderAdapter } from './adapter/cdp-order-adapter';
import { finalOrder } from './model/order/finalOrder';
import { order } from './model/orderDetail/order';
import { result } from './model/result';


@Component({
  selector: 'cx-order',
  templateUrl: './cdp-order.component.html',
  styleUrls: ['./cdp-order.component.scss'],
  providers: [CxDatePipe],
})
export class OrderComponent implements OnInit{

  constructor(private userIdService: UserIdService,private cdpOrderAdapter: cdpOrderAdapter,protected datePipe: CxDatePipe){}

  result: finalOrder={orders:[]};
  totalPrice: number=0;
  totalItem: number[]=[];
  orderDetail: Record<string,order>={};
  i: number=0;
  output: result;
  orderStatus: Record<string,Record<string,number>>={};
  orderUrl: Record<string,string[]>={};
  userId: string;

  ngOnInit(): void {
    this.getMyData();
  }

  public getMyData(): void{

   const obser= this.userIdService.takeUserId().pipe(switchMap((userId) => this.cdpOrderAdapter.getOrder(userId)));

   obser.subscribe(res => {
    this.result=res;
    this.calculateTotalAmount(this.result);
    this.getItemCount(this.result);
  });
  }

  public calculateTotalAmount(finalResult: finalOrder): void{

    for(var val of finalResult.orders)
    {
      this.totalPrice = val.total.value + this.totalPrice;
      console.log(this.totalPrice);
    }
  }

  public async getItemCount(finalResult: finalOrder): Promise<void>{

    for(let orderval of finalResult.orders)
    {
      // this.userIdService.takeUserId().pipe(mergeMap((userId)=> this.cdpOrderAdapter.getOrderDetail(userId,orderval))).subscribe(data=>{
      //   this.orderDetail[orderval.code]=data;
      //   this.getDetail();
      // });
      //this.orderDetail[orderval.code]
      await this.userIdService.takeUserId().pipe(mergeMap((userId)=> this.cdpOrderAdapter.getOrderDetail(userId,orderval))).toPromise().then( data=>{
        this.orderDetail[orderval.code]=data;
      });
    }
    this.getDetail();
  }

  public getDetail()
  {
    // eslint-disable-next-line guard-for-in
    for(let orderCode in this.orderDetail){
      this.orderStatus[orderCode]??={};
      this.orderDetail[orderCode].consignments.forEach(ord=>{
        this.orderStatus[orderCode][ord.status]??=0;
        ord.entries.forEach(entr=>{
          console.log(orderCode +" status "+ord.status + entr.quantity);
          this.orderStatus[orderCode][ord.status]= this.orderStatus[orderCode][ord.status] + entr.quantity;
        });
      });
      // this.orderDetail[orderCode].entries.forEach(ord=>{
      //   this.orderUrl[orderCode]??=[];
      //   ord.product.images.url.forEach(img=>{
      //     if(!this.orderUrl[orderCode].includes(img)){
      //       this.orderUrl[orderCode].push(img);
      //     }
      //   });
      // });
    }
    console.log(this.orderStatus);
    console.log(this.orderUrl);
  }

}
