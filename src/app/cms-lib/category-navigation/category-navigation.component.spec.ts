import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material.module';
import { NavigationModule } from '../navigation/navigation.module';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';
import { CategoryNavigationComponent } from './category-navigation.component';
import * as fromRoot from '../../routing/store';
import * as fromCmsReducer from '../../newcms/store/reducers';
import { ConfigService } from '../../newcms/config.service';

class UseConfigService {
  cmsComponentMapping = {
    CategoryNavigationComponent: 'CategoryNavigationComponent'
  };
}

fdescribe('CategoryNavigationComponent', () => {
  let component: CategoryNavigationComponent;
  let fixture: ComponentFixture<CategoryNavigationComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          NavigationModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCmsReducer.reducers)
          })
          //RouterTestingModule
        ],
        declarations: [CategoryNavigationComponent],
        providers: [{ provide: ConfigService, useClass: UseConfigService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create category navigation component in CmsLib', () => {
    expect(component).toBeTruthy();
  });
});
