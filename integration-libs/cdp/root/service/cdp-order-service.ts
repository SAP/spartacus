import { UserIdService } from "@spartacus/core";
import { switchMap } from "rxjs/operators";
import { cdpOrderAdapter } from "../adapter/cdp-order-adapter";
import { finalOrder } from "../model/order/finalOrder";

export class cdpOrderService{

  result: finalOrder={orders:[]};

  constructor(private cdpOrderAdapter: cdpOrderAdapter,private userIdService: UserIdService){}

  public getMyData(): finalOrder{
    const obser= this.userIdService.takeUserId().pipe(switchMap((userId) => this.cdpOrderAdapter.getOrder(userId)));

    obser.subscribe(res => {
        this.result=res;
        return this.result;
     });


  }
}
