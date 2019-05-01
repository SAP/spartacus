import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaComponent } from './media.component';
import { Media } from './media.model';
import { MediaService } from './media.service';

class MockMediaService {
  getImage(media): Media {
    return {
      src: media ? media.product.url : undefined,
      srcset: undefined,
      alt: undefined,
    };
  }
}

describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaComponent],
      providers: [{ provide: MediaService, useClass: MockMediaService }],
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
    component.container = mockImageContainer;

    component.ngOnChanges();

    expect(component.media.src).toEqual('mockProductImageUrl');
  });

  it('should call ngOnInit() with invalid image url', () => {
    component.ngOnChanges();

    expect(component.media.src).toEqual(undefined);
  });
});
