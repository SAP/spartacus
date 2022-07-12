import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CommerceQuotesRequestQuoteDialogComponent } from '../commerce-quotes-request-quote-dialog/commerce-quotes-request-quote-dialog.component';
import { CommerceQuotesRequestQuoteButtonComponent } from './commerce-quotes-request-quote-button.component';
import createSpy = jasmine.createSpy;

const mockCartId = 'cart1';
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActiveCartId = createSpy().and.returnValue(of(mockCartId));
}
const mockRequestQuoteComponentModalRef: any = {
  componentInstance: {
    cartId: '',
  },
  result: new Promise((resolve) => {
    return resolve(true);
  }),
};

class MockModalService implements Partial<ModalService> {
  open = createSpy().and.returnValue(mockRequestQuoteComponentModalRef);
}

describe('CommerceQuotesRequestQuoteButtonComponent', () => {
  let component: CommerceQuotesRequestQuoteButtonComponent;
  let fixture: ComponentFixture<CommerceQuotesRequestQuoteButtonComponent>;
  let modalService: ModalService;
  let activeCartService: ActiveCartFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommerceQuotesRequestQuoteButtonComponent, MockUrlPipe],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartService,
        },
        {
          provide: ModalService,
          useClass: MockModalService,
        },
      ],
    }).compileComponents();

    modalService = TestBed.inject(ModalService);
    activeCartService = TestBed.inject(ActiveCartFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CommerceQuotesRequestQuoteButtonComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showDialog method to invoke dialog component', () => {
    component.showDialog();

    expect(activeCartService.getActiveCartId).toHaveBeenCalled();
    expect(modalService.open).toHaveBeenCalledWith(
      CommerceQuotesRequestQuoteDialogComponent,
      {
        centered: true,
        size: 'lg',
      }
    );
    expect(component.modalRef.componentInstance.cartId).toEqual(mockCartId);
  });
});
