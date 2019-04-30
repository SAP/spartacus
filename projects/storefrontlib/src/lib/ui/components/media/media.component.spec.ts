import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaComponent } from './media.component';

describe('PictureComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaComponent);
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

    expect(component.image).toEqual('mockProductImageUrl');
  });

  it('should call ngOnInit() with invalid image url', () => {
    component.ngOnChanges();

    expect(component.image).toEqual(undefined);
  });
});
