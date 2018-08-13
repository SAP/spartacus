import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterNavigationComponent } from './footer-navigation.component';
import * as fromRoot from '../../routing/store';
import * as fromCmsReducer from '../../cms/store/reducers';
import { ConfigService } from '../../cms/config.service';
import { MatListModule, MatCardModule } from '@angular/material';
import { NavigationModule } from '../navigation/navigation.module';

class UseConfigService {
  cmsComponentMapping = {
    FooterNavigationComponent: 'FooterNavigationComponent'
  };
}

describe('FooterNavigationComponent', () => {
  let footerNavigationComponent: FooterNavigationComponent;
  let fixture: ComponentFixture<FooterNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          cms: combineReducers(fromCmsReducer.reducers)
        }),
        RouterTestingModule,
        MatListModule,
        MatCardModule,
        NavigationModule
      ],
      declarations: [FooterNavigationComponent],
      providers: [{ provide: ConfigService, useClass: UseConfigService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterNavigationComponent);
    footerNavigationComponent = fixture.componentInstance;
  });

  it('should create FooterNavigationComponent in CmsLib', () => {
    expect(footerNavigationComponent).toBeTruthy();
  });
});
