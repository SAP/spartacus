import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Params } from '@angular/router';
import { RouterState, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ModalOptions, ModalRef, ModalService } from '../../modal/index';
import { AnonymousConsentsDialogComponent } from './anonymous-consents-dialog.component';
import {
  AnonymousConsentsComponent,
  ANONYMOUS_CONSENTS_QUERY_PARAMETER,
} from './anonymous-consents.component';

class MockModalService {
  closeActiveModal(_reason?: any): void {}
  open(_content: any, _options?: ModalOptions): ModalRef {
    return <ModalRef>{};
  }
}
class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of();
  }
  isNavigating(): Observable<boolean> {
    return of();
  }
  goByUrl(_url: string): void {}
}

describe('AnonymousConsentsComponent', () => {
  let component: AnonymousConsentsComponent;
  let fixture: ComponentFixture<AnonymousConsentsComponent>;
  let modalService: ModalService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnonymousConsentsComponent],
      providers: [
        {
          provide: ModalService,
          useClass: MockModalService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousConsentsComponent);
    component = fixture.componentInstance;
    modalService = TestBed.get(ModalService as Type<ModalService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);

    fixture.detectChanges();
    spyOn(routingService, 'isNavigating').and.returnValue(of(false));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const handleClosingMethod = 'handleClosing';
  describe(handleClosingMethod, () => {
    it('should replace the query param and go to the new url', done => {
      spyOn(routingService, 'goByUrl').and.stub();
      const promise = new Promise(resolve => {
        resolve();
      });
      const modalRef: ModalRef = <ModalRef>{
        result: promise,
      };
      component[handleClosingMethod](
        modalRef,
        `/xxx?${ANONYMOUS_CONSENTS_QUERY_PARAMETER}=true`,
        `?${ANONYMOUS_CONSENTS_QUERY_PARAMETER}=true`
      );
      promise.then(_ => {
        expect(routingService.goByUrl).toHaveBeenCalledWith('/xxx');
        done();
      });
    });
  });

  const openDialogMethod = 'openDialog';
  describe(openDialogMethod, () => {
    it('shold call open', () => {
      const mockModalRef = <ModalRef>{};
      spyOn(modalService, 'open').and.returnValue(mockModalRef);
      const result = component[openDialogMethod]();
      expect(result).toEqual(mockModalRef);
      expect(modalService.open).toHaveBeenCalledWith(
        AnonymousConsentsDialogComponent,
        {
          centered: true,
          size: 'lg',
          scrollable: true,
          backdrop: 'static',
        }
      );
    });
  });

  const buildQueryParamMethod = 'buildQueryParam';
  describe(buildQueryParamMethod, () => {
    it('should build a query param', () => {
      const anonymousConsentsQueryParamValue = true;
      const result = component[buildQueryParamMethod](
        anonymousConsentsQueryParamValue
      );
      expect(result).toEqual(
        `?${ANONYMOUS_CONSENTS_QUERY_PARAMETER}=${anonymousConsentsQueryParamValue}`
      );
    });
  });

  describe('ngOnInit', () => {
    describe('if the query URL is true', () => {
      it('should open the dialog, build a query param and prepare a closing logic', () => {
        const queryParamValue = true;
        const queryParams: Params = {
          [ANONYMOUS_CONSENTS_QUERY_PARAMETER]: queryParamValue,
        };
        const mockState = {
          state: {
            queryParams,
            url: '/xxx',
          },
        };
        const mockModalRef = <ModalRef>{};
        const mockQuery = `?${ANONYMOUS_CONSENTS_QUERY_PARAMETER}=${queryParamValue}`;
        spyOn(routingService, 'getRouterState').and.returnValue(
          of(mockState as any)
        );
        spyOn<any>(component, buildQueryParamMethod).and.returnValue(mockQuery);
        spyOn<any>(component, openDialogMethod).and.returnValue(mockModalRef);
        spyOn<any>(component, handleClosingMethod).and.stub();

        component.ngOnInit();
        expect(component[buildQueryParamMethod]).toHaveBeenCalledWith(
          queryParamValue
        );
        expect(component[openDialogMethod]).toHaveBeenCalled();
        expect(component[handleClosingMethod]).toHaveBeenCalledWith(
          mockModalRef,
          mockState.state.url,
          mockQuery
        );
      });
    });
    describe('if the query URL is false', () => {
      it('should NOT open the dialog', () => {
        const queryParamValue = false;
        const queryParams: Params = {
          [ANONYMOUS_CONSENTS_QUERY_PARAMETER]: queryParamValue,
        };
        const mockState = {
          state: {
            queryParams,
            url: '/xxx',
          },
        };
        spyOn(routingService, 'getRouterState').and.returnValue(
          of(mockState as any)
        );
        spyOn<any>(component, buildQueryParamMethod).and.stub();
        spyOn<any>(component, openDialogMethod).and.stub();
        spyOn<any>(component, handleClosingMethod).and.stub();

        component.ngOnInit();
        expect(component[buildQueryParamMethod]).not.toHaveBeenCalled();
        expect(component[openDialogMethod]).not.toHaveBeenCalled();
        expect(component[handleClosingMethod]).not.toHaveBeenCalled();
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('should call unsubscribe', () => {
      spyOn<any>(component['subscriptions'], 'unsubscribe').and.stub();
      component.ngOnDestroy();
      expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
    });
  });
});
