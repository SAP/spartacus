import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, TranslationService } from '@spartacus/core';
import { Card, CardModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CustomerTicketingDetailsComponent } from './customer-ticketing-details.component';

const mockTicketId = '1';

class MockTranslationService {
  translate(text: string): Observable<string> {
    return of(text);
  }
}

describe('CustomerTicketingDetailsComponent', () => {
  let component: CustomerTicketingDetailsComponent;
  let fixture: ComponentFixture<CustomerTicketingDetailsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, CardModule],
      declarations: [CustomerTicketingDetailsComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sohuld prepare content for card', () => {
    const mockCardContent: Card = {
      text: ['1'],
      title: 'ID',
      customClass: '',
    };
    component
      .prepareCardContent(mockTicketId, 'ID')
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(mockCardContent);
      });
  });

  describe('getStatusClass', () => {
    it('should return open class when the status is open', () => {
      let result = component.getStatusClass('OPEN');

      expect(result).toEqual('cx-text-green');
    });

    it('should return close class when the status is close', () => {
      let result = component.getStatusClass('CLOSE');

      expect(result).toEqual('cx-text-gray');
    });

    it('should return empty if the id is not passed', () => {
      let result = component.getStatusClass('');

      expect(result).toEqual('');
    });
  });
});
