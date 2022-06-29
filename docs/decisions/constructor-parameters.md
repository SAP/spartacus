## 1. Title
Get rid of constructor dependencies

## 2. Status
Proposed

## 3. Involved areas
dependency injection, breaking changes migrations, extensibility 

## 4. Context
Angular 14 introduced an `inject` function that allows for injecting any injectables (services or injection tokens). The function can be invoked only during the time of the constructor evaluation (including the initialization of class properties). The following examples show the traditional injection in constructor vs. injecting dependencies only via `inject` function:


```ts
/* Traditional injection in constructor */

@Injectable(...)
export class Service {
	constructor(
		protected serviceA: ServiceA,
		protected serviceB: ServiceB,
		@Inject(PLATFORM_ID) protected platformId: any
	){}
}
```

vs.

```ts
/* Injection via `inject` function */

import { inject } from '@angular/core';

@Injectable()
export class Service {
	  protected serviceA: ServiceA;
	
	  constructor(){
	    // `inject` allowed in constructor body:
		  this.serviceA = inject(ServiceA);
	  }

	// `inject` allowed in property initialization:
	protected serviceB = inject(ServiceB); //note: property type is automatically derived
	protected platformId = inject(PLATFORM_ID); // you can inject injection tokens as well
}
```

**The question is: should we get rid of the constructor dependencies or not?**


### Option 1: Use `inject` function instead of constructor parameters


#### Pros
- no constructor parameters means no more breaking changes because of adding a new constructor dependency
	- no more maintenance hassle of providing migration docs and schematics for changed constructor signatures

#### Cons
- we need to migrate customers from old implementation (many parameters) to new one (no parameters) - provide schematics and docs
- you cannot use the class in the isolation from DI (e.g. by calling `new Service(...paramsHere)`)
	- but we don't see usecases to do it. For edge cases when we really need to instantiate the class with `new` keyword, we can just exceptionally leave the constructor dependencies in this class
- we highly couple the service implementation with the framework / DI container of Angular -> harder to reuse the service class in React or Vue. And it requires to setup a global locator object before using any code that uses `inject()`
- dependencies are not explicitly part of the interface, which obscures dependencies. Moreover dependencies can be tangled with other properties initialization, like in the example section below
	- this can be mitigated by an ESLint rule that forces the dependencies initialization on the top of the class body

#### Interesting
- how to preserve the clarity of the declarative dependencies - introduce ES Lint rule?
	- can we easily enforce injecting dependencies at the top of the class body (e.g. with custom ESLint rule)?

#### Additional notes:

##### Customers can use `inject` function to simplify introducing new injectable dependencies in their extended service

Since customers use Angular 14, they can use `inject` function on their own to introduce new dependencies in the extended services, regardless the number of constructor parameters in our original classes. They just don't need to call `super(...)` in their constructors anyway. See the following example:

```ts
/* Custom extension of the service */

import { inject } from '@angular/core';

@Injectable()
export class CustomService extends SpartacusService {
	// custom new dependency:
	protected serviceX = inject(ServiceX);

	/*
	No need to call `super(...)` and pass all the original parameters there:

	constructor(
		protected serviceA: ServiceA,
		...
		protected serviceN: ServiceN,
		protected serviceX: ServiceX // custom new dependency
	){
		super(serviceA,...,serviceN);
	}
	*/
}
```


##### Without linting control, the dependencies declaration might get tangled with other logic and properties initialization

See the example how the invocations of `inject()` function can potentially get tangled with other properties initialization:

```ts
/* Spartacus service */

import { inject } from '@angular/core';

@Injectable()
export class Service {
	protected serviceC = inject(ServiceC);
	protected staticVar = 123;
	protected myData$ = (this.serviceA.whatShouldIUse() ? inject(DataService) : inject(DataService2)).getData().pipe(
		map(data => data.data),
		/** 
		 * big
		 * 		|
		 * 		stream
		 * 				|
		 * 				logic
		 * 		|
		 * 		here */
		map(data => data.data),
		);
	protected serviceD = inject(ServiceD);
	protected staticVar2 = 'abc';
	protected serviceG = inject(ServiceG);

}
```

But this hopefully can be avoided by a custom ES Lint rule that forces all usages of `inject` function at the top of the class body.

### If we really need to stick with constructor params for a certain class, we can exceptionally leave the constructor dependencies or implement a fallback constructor

See an example of a fallback constructor parameter that can be used in case we want to exceptionally instantiate class the class with `new` keyword:

```ts
@Injectable()
export class Foo {
  serviceA: ServiceA;
  serviceB: ServiceB;

  constructor(
    dependencies: Partial<FooDependencies> = {}
  ) {
    this.serviceA = dependencies.serviceA || inject(ServiceA);
    this.serviceB = dependencies.serviceB || inject(serviceB);
  }
}
```

This comes with the cost of a little bit of boilerplate code.

##### We could introduce a facade `inject` function, exported from `@spartacus/core`
To mitigate the possible problems with porting our services implementation to other frameworks, we could introduce a facade `inject` function that would be exported from `@spartacus/core` and used by our services. Customers could extend/hook into our `inject` function in case they want to opt out from the Angular's DI

Note: if we implement such a proxy, then we should forbid with ESlint rule a usage of the original Angular's `inject` function, for consistency


### Option 2: Use `Injector` instead of constructor parameters
Similar to using `inject` from ng14, we can use the Angular `Injector` class, with its method `get()` to get the dependency. See the following example:

```ts
/* Injection via `Injector` class - you could do it also prior to ng14 */

import { Injector } from '@angular/core';

@Injectable()
export class Service {
	  protected serviceA: ServiceA;
	
		// inject only the `Injector` class:
	  constructor(protected injector: Injector){
			// `Injector.get` allowed in constructor:
		  this.serviceA = this.injector.get(ServiceA);
	  }

	// `Injector.get` allowed in property initialization:
	protected serviceB = this.injector.get(ServiceB); 
	
	// `Injector.get` allowed lazily in runtime!
	lazyMethod(){
		return this.injector.get(ServiceC).getData();
	}
}
```

This solution is pretty similar to the Option 1 (using `inject` function from ng14). It has the same advantages and disadvantages. But moreover it has an additional significant disadvantage: the `Injector.get` method can be called lazily, anytime in the lifecycle of the service. So it's much harder to reason about dependencies of such a service.

Since this option is only worse than the Option 1, it's disqualified.

### Option 3: keep constructor paramteters

#### Pros

#### Cons

#### Interesting

## 5. Decision
_Elaborate the decision_

## 6. Consequences
_What becomes easier or more difficult to do because of this change?_




