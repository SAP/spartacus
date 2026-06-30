## Results

Before : 241 failing files / 1377 failing tests
After  : 183 failing files / 1313 failing tests
Fixed  : 58 files, ~60 additional tests passing


### What was fixed (in-scope per prompt)

Category                                                                                          | Files Fixed                                          | Transformation
--------------------------------------------------------------------------------------------------|------------------------------------------------------|----------------------------------
spyOn(...).and.returnValue() → vi.spyOn(...).mockReturnValue()                                    | ~110 files                                           | Mechanical sed across all spec files
spyOn(...).and.callThrough() → vi.spyOn(...)                                                      | ~110 files                                           | .and.callThrough() removed (default in vitest)
spyOn(...).and.callFake(fn) → .mockImplementation(fn)                                             | ~20 files                                            | Mechanical
spyOn(...).and.stub() → .mockImplementation(() => {})                                             | ~10 files                                            | Mechanical
jasmine.createSpy() / import createSpy = jasmine.createSpy → vi.fn()                             | ~37 files                                            | Mechanical
jasmine.objectContaining() → expect.objectContaining()                                            | ~30 files                                            | Mechanical
jasmine.any() → expect.any()                                                                      | ~15 files                                            | Mechanical
jasmine.anything() → expect.anything()                                                            | ~5 files                                             | Mechanical
jasmine.Spy / jasmine.SpyObj<T> types → Mock / concrete type                                     | ~17 files                                            | Mechanical
jasmine.clock() → vi.useFakeTimers() / vi.setSystemTime()                                        | 1 file                                               | Mechanical
spyOnProperty(obj, 'prop').and.returnValue() → vi.spyOn(obj, 'prop', 'get').mockReturnValue()    | ~5 files                                             | Mechanical
.toBeTrue() / .toBeFalse() → .toBe(true) / .toBe(false)                                          | 1 file                                               | Mechanical
Missing import { vi } from 'vitest'                                                               | ~184 files                                           | Auto-prepended
Missing import { vi, Mock } from 'vitest'                                                         | ~12 files                                            | Auto-prepended
fakeAsync/tick → vi.useFakeTimers() + vi.advanceTimersByTimeAsync()                               | 2 files (oauth-lib-wrapper, http-timeout.interceptor)| Manual rewrite
waitForAsync → plain sync                                                                         | 1 file (feature.directive)                           | Manual rewrite
done() callback → async/await + firstValueFrom                                                    | 1 file (http-error-handler.interceptor)              | Manual rewrite
.calls.mostRecent().args[N] → .mock.lastCall[N]                                                  | 2 files                                              | Mechanical


---


### Remaining failures — not fixed (183 files, 1313 tests)

#  | Error                                                                                                             | ~Files | Example Files                                                                                                           | Suggested Fix Reference
---|-------------------------------------------------------------------------------------------------------------------|--------|-------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------
1  | NG0202 — providedIn: 'root' + HTTP_INTERCEPTORS / APP_INITIALIZER multi-token DI                                 | ~120   | client-token.interceptor.spec.ts, auth.interceptor.spec.ts, http-error.interceptor.spec.ts                             | site-context.interceptor.spec.ts (already done) — useFactory to construct interceptor manually
2  | inject() called before TestBed.configureTestingModule — Angular 18 strict TestBed isolation                      | ~16    | facade-factory.service.spec.ts, occ-cms-component.adapter.spec.ts, legacy-occ-cms-component.adapter.spec.ts           | No reference yet — move TestBed.inject() calls inside beforeEach
3  | httpMock.verify() is undefined — HttpTestingController not injected because NG0202 blocks TestBed setup           | ~16    | Same as row 1                                                                                                           | Same as row 1 — fixing NG0202 will unblock these
4  | HTTP expectOne no match — requests go to wrong URL because base URL provider not resolved                         | ~4     | client-token.interceptor.spec.ts, auth.interceptor.spec.ts, http-error.interceptor.spec.ts                             | Same as row 1 — cascade from NG0202
5  | ESM vi.spyOn on module namespace — vi.spyOn(NgrxStore, 'select', 'get') fails, ESM exports not configurable      | ~7     | product-search.service.spec.ts, searchbox.service.spec.ts, global-message.service.spec.ts                             | No reference yet — mock store.select on injected instance or use vi.mock('@ngrx/store', ...)
6  | ProxyZone / fakeAsync — remaining waitForAsync in component tests that need Angular's zone                        | ~2     | feature-level.directive.spec.ts, product-search-by-code.service.spec.ts                                               | back-off.spec.ts + http-timeout.interceptor.spec.ts (already done)
7  | i18n is undefined — i18next config not fully resolved in test environment                                         | ~2     | i18next-http-backend.initializer.spec.ts, i18next-initializer.spec.ts                                                 | No reference yet — likely needs i18n config mock or APP_INITIALIZER setup
8  | .stub() is not a function — vi.fn().and.stub() not fully converted (residual from createSpyObj conversion)        | ~1     | Check files where createSpyObj resolved to {}                                                                          | Re-examine createSpyObj with complex method lists — manually provide { method: vi.fn() }
9  | spyOn / jasmine still undefined (residual)                                                                        | ~2     | custom-login.guard.spec.ts (multiline fixed), check others                                                             | Multiline fix was applied — re-run to confirm

Priority order for next session: Row 1 (NG0202 HTTP_INTERCEPTORS pattern) unlocks rows 3 and 4 automatically — fixing that single pattern covers the majority of remaining failures.
