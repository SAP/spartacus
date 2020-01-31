import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  OutletPosition,
  OutletService,
} from '../../../../cms-structure/outlet/index';

export const MODAL_OPEN_CLASS = 'cx-modal-open';

@Injectable({
  providedIn: 'root',
})
export class ModalComponentService {
  private _opened = new BehaviorSubject<boolean>(false);
  private _component = new BehaviorSubject<string>(null);

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected outletService: OutletService<ComponentFactory<any>>,
    protected windowRef: WindowRef
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
    console.log(component.name);
    this._component.next(component.name);
  }

  close(): void {
    this.outletService.remove('cx-generic-modal', OutletPosition.BEFORE);
    this._opened.next(false);
    this._component.next(null);
    this.clearConfigs();
  }

  get component(): Observable<string> {
    return this._component.asObservable();
  }

  private clearConfigs(): void {
    if (this.windowRef.document.body.classList.contains(MODAL_OPEN_CLASS)) {
      this.windowRef.document.body.classList.remove(MODAL_OPEN_CLASS);
    }
  }
}
