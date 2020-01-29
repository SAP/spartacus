import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  OutletPosition,
  OutletService,
} from '../../../../cms-structure/outlet/index';

@Injectable({
  providedIn: 'root',
})
export class ModalComponentService {
  private _opened = new BehaviorSubject<boolean>(false);

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected outletService: OutletService<ComponentFactory<any>>
  ) {}

  get opened(): Observable<boolean> {
    return this._opened.asObservable();
  }

  open(component: any): void {
    this._opened.next(true);
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );
    this.outletService.add('cx-generic-modal', factory, OutletPosition.BEFORE);
  }

  close(): void {
    this.outletService.remove('cx-generic-modal', OutletPosition.BEFORE);
    this._opened.next(false);
  }
}
