import { Injectable } from '@angular/core';
import { CancelOrReturnRequestEntryInput } from '@spartacus/core';

@Injectable()
export class OrderCancelOrReturnService {
  private _cancelOrReturnRequestInputs: CancelOrReturnRequestEntryInput[];

  constructor() {}

  get cancelOrReturnRequestInputs(): CancelOrReturnRequestEntryInput[] {
    return this._cancelOrReturnRequestInputs;
  }

  set cancelOrReturnRequestInputs(values: CancelOrReturnRequestEntryInput[]) {
    this._cancelOrReturnRequestInputs = values;
  }
}
