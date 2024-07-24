import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S4ServiceOrderDetailActionsComponent } from './s4-service-order-detail-actions.component';

describe('S4ServiceOrderDetailActionsComponent', () => {
  let component: S4ServiceOrderDetailActionsComponent;
  let fixture: ComponentFixture<S4ServiceOrderDetailActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [S4ServiceOrderDetailActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(S4ServiceOrderDetailActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
