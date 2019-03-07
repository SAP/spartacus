import { Promotion } from '@spartacus/core';
import { PromotionsComponent } from './promotions.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

fdescribe('PromotionsComponent', () => {
  let component: PromotionsComponent;
  let fixture: ComponentFixture<PromotionsComponent>;

  const mockPromotion: Promotion = {
    description: 'Promotion description'
  };

  const mockPromotions: Promotion[] = [mockPromotion];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render promotion list', () => {
    component.promotions = mockPromotions;
    fixture.detectChanges();
    const promotionsContent = fixture.debugElement.query(
      By.css('.cx-promotions')
    ).nativeElement.textContent;

    expect(promotionsContent).toContain(mockPromotion.description);
  });
});
