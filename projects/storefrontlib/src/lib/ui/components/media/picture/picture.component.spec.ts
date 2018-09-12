import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureComponent } from './picture.component';

describe('PictureComponent', () => {
  let component: PictureComponent;
  let fixture: ComponentFixture<PictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PictureComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit() with valid image url', () => {
    const mockImageContainer = { product: { url: 'mockProductImageUrl' } };
    component.imageContainer = mockImageContainer;

    component.ngOnChanges();

    expect(component.mainImage).toEqual('mockProductImageUrl');
  });

  it('should call ngOnInit() with invalid image url', () => {
    component.ngOnChanges();

    expect(component.mainImage).toEqual(undefined);
  });
});
