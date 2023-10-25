import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpfCtaElementComponent } from './opf-cta-element.component';

describe('OpfCtaButton', () => {
  let component: OpfCtaElementComponent;
  let fixture: ComponentFixture<OpfCtaElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpfCtaElementComponent],
    });
    fixture = TestBed.createComponent(OpfCtaElementComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
