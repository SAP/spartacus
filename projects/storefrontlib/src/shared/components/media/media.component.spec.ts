import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MediaComponent } from './media.component';
import { Media } from './media.model';
import { MediaService } from './media.service';

const mediaUrl = 'mockProductImageUrl.jpg';

class MockMediaService {
  getImage(media): Media {
    return {
      src: media ? media.product.url : undefined,
      srcset: undefined,
      alt: undefined,
    };
  }
  getMissingImage() {
    return {
      src: 'missing.jpg',
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
    const mockImageContainer = {
      product: { url: mediaUrl },
    };
    component.container = mockImageContainer;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create media object with valid image url', () => {
    expect(component.media.src).toEqual(mediaUrl);
  });

  it('should update the img element with image url', () => {
    expect(
      (<HTMLImageElement>(
        fixture.debugElement.query(By.css('img')).nativeElement
      )).src
    ).toContain(mediaUrl);
  });
});
