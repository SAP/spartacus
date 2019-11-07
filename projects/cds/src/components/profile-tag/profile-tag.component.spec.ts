import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ProfileTagComponent } from './profile-tag.component';
import { ProfileTagInjector } from './profile-tag.injector';

class MockProfileTagInjector {
    injectScript(): Observable<boolean[]> {
        return of([true, true]);
    }
}

describe('ProfileTagComponent', () => {
    let component: ProfileTagComponent;
    let fixture: ComponentFixture<ProfileTagComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileTagComponent],
            providers: [
                {
                    provide: ProfileTagInjector,
                    useClass: MockProfileTagInjector,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileTagComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be loaded', () => {
        let result: boolean;

        component.profileTagEnabled$.subscribe(data => (result = Boolean(data)));

        expect(result).toBe(true);
    });
});
