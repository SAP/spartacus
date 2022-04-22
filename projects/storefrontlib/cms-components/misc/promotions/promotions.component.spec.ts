import { Promotion } from '@spartacus/core';
import { PromotionsComponent } from './promotions.component';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('PromotionsComponent', () => {
  let component: PromotionsComponent;
  let fixture: ComponentFixture<PromotionsComponent>;

  const mockPromotion: Promotion = {
    description: 'Promotion description',
  };

  const mockPromotions: Promotion[] = [mockPromotion];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [PromotionsComponent],
        providers: [],
      }).compileComponents();
    })
  );

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
