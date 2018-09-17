import { ContactPageLayoutComponent } from './contact-page-layout.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('ContactPageLayoutComponent', () => {
  let component: ContactPageLayoutComponent;
  let fixture: ComponentFixture<ContactPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactPageLayoutComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPageLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
