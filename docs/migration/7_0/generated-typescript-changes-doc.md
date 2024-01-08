<!-- Generated file.  Don't update directly -->

# 7.0 Typescript Breaking Changes

This document contains a list of breaking changes or potentially breaking changes for Spartacus 7.0.



# Function property
## @spartacus/asm/core


Function property changed.

Previous version:

```

property(
  prop1: P1,
  prop2: P2,
  comparator: Comparator<T[P1][P2]>
): Comparator<T>

```


Current version:

```

property(
  prop: P,
  comparator: Comparator<T[P]>
): Comparator<T>

```




# Interface CardType
## @spartacus/cart/base/root

moved to @spartacus/core




# Interface PaymentDetails
## @spartacus/cart/base/root

moved to @spartacus/core




# Variable I18NEXT_HTTP_BACKEND_CLIENT
## @spartacus/core


Variable I18NEXT_HTTP_BACKEND_CLIENT changed.

Previous version:

```
I18NEXT_HTTP_BACKEND_CLIENT: InjectionToken<((options: BackendOptions, url: string, payload: string | {}, callback: RequestCallback) => void) | undefined>
```


Current version:

```
I18NEXT_HTTP_BACKEND_CLIENT: InjectionToken<((options: import("i18next-http-backend").HttpBackendOptions, url: string, payload: string | {}, callback: import("i18next-http-backend").RequestCallback) => void) | undefined>
```




# TypeAlias I18nextHttpBackendClient
## @spartacus/core


TypeAlias I18nextHttpBackendClient changed.

Previous version:

```
BackendOptions,
['request']
```


Current version:

```
HttpBackendOptions,
['request']
```




# Class I18nextHttpBackendInitializer
## @spartacus/core


### Method getBackendConfig changed.


Previous version:

```

getBackendConfig(): BackendOptions

```


Current version:

```

getBackendConfig(): HttpBackendOptions

```


### Method initialize changed.


Previous version:

```

initialize(): InitOptions

```


Current version:

```

initialize(): InitOptions<HttpBackendOptions>

```


