## 1. Title
Stop using constructor parameters for dependency injection

## 2. Status
Rejected

## 3. Involved areas
dependency injection, breaking changes migrations, extensibility 

## 4. Context
Angular 14 introduced an `inject` function that allows for injecting any injectables (services or injection tokens). The function can be invoked only during the time of the constructor evaluation (including the initialization of class properties). And it can be used to inject dependencies, instead of using constructor parameters. The following examples show the traditional injection in constructor vs. injecting dependencies only via `inject` function:


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

In the light of the `inject` function introduced in Angular 14, we should ask ourselves: **How do we want to inject dependencies in Spartacus classes since Angular 14?**


### Option 1: Use `inject` function instead of constructor parameters


#### Pros
- less maintenance hassle for the core team - no need for:
	- adding optional constructor parameters in Minor releases
	- making those parameters required in Major releases and then providing migration docs and schematics for changed constructor signatures

#### Cons
- once in a Major release, we need to migrate customers from old implementation (with constructor parameters) to the new one (no parameters) - provide schematics and docs
- you cannot use the class in the isolation from DI (e.g. by calling `new Service(...paramsHere)`)
	- but we don't see usecases to do it. For edge cases when we really need to instantiate the class with `new` keyword, we can just exceptionally leave the constructor dependencies in this class
- the service implementation is highly coupled with the framework / DI container of Angular -> harder to reuse the service class in React or Vue. And it requires to setup a global locator object before using any code that uses `inject()`
	- but we can mitigate the problem, by exporting our own "facade `inject` function" from `@spartacus/core` and allow customers to customize it if they want to opt-out from Angular DI
- dependencies are not explicitly part of the interface, which obscures dependencies. Moreover dependencies can be tangled with other properties initialization, like in the example code snippet below
	- this can be mitigated by an ESLint rule that forces the dependencies initialization on the top of the class body

#### Interesting
- how to preserve the clarity of the declarative dependencies - introduce ES Lint rule?
	- can we easily enforce injecting dependencies at the top of the class body (e.g. with custom ESLint rule)?

//
Investment:
- create breaking changes in constructors (can we automate creating schematics?)
- create ES Lint rule for organizing dependencies initialization at the top of the class body 

Return:
- less breaking changes
- less maintenance hassle for the core team

Risks:
- we solve one problem, but might introduce new ones (that are not known until we release it)

Unknowns to check:
- how to refactor constructors that contain logic, but use injectable dependencies
	- question: can we use initialized properties in the constructor body
	- workaround idea: use `inject` in the constructor body (instead of property initialization)
- how can we automate the changes in our codebase, and creating migrations

Is the investment worth it?
Maybe.
	- hard to say how much efforts it takes (migrations, docs, communication to train people)


Open ends: 
- Do we roll out the change in every class of Spartacus in major release, or in parts (in many majors), e.g. only storefinder lib in the first go – to test the reaction of customers?
	- Why: We’re unfamiliar with the `inject` function, same for the community. It hasn't been widely adopted in the community. Therefore we're a bit hesitant to use it 100% everywhere in the next major release.
- Is the investment worth it? 
	- Current costs we pay when having constructor parameters: 
		- ??? weeks of work for few people (depending on the number of constructor changes) before every major release to change all optional parameters as required and provide migrations (docs and schematics) 
		- Prone to introducing accidental breaking changes by adding new required constructor dependencies 
	- Cost of switching once to inject function and dropping constructor params everywhere: 
		- Refactor whole codebase constructors to inject functions (with regex/script + manual review needed) 
		- Create custom ESLint rule: to put all `inject` calls in the top of the class body, as property initializers 
		- Test migration scripts on example fresh app with example customizations of constructors 
		- about 2 weeks of work for 2 people


#### Additional notes:

##### Customers can use `inject` function to simplify introducing new injectable dependencies in their extended service

Since customers upgrade to Angular 14, they can use `inject` function on their own to introduce new dependencies in the extended services, regardless the number of constructor parameters in our original classes. They just don't need to call `super(...)` in their constructors anyway. See the following example:

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

No action is needed on our side to allow them using `inject`.


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

This can be a big problem. But this hopefully can be avoided by a custom ES Lint rule that forces all usages of `inject` function at the top of the class body.

##### If we really need to stick with constructor params for a certain class, we can exceptionally leave the constructor dependencies or implement a fallback constructor

We can leave constructor dependencies for some exceptional cases. Or use a fallback constructor that can be used in the isolation from DI.
See an example of a fallback constructor parameter that can be used in case we want to exceptionally instantiate class the class with `new` keyword:

```ts
@Injectable()
export class Foo {
  serviceA: ServiceA;
  serviceB: ServiceB;

  constructor(
    dependencies: Partial<FooDependencies> = {}
  ) {
    this.serviceA = dependencies.serviceA ?? inject(ServiceA);
    this.serviceB = dependencies.serviceB ?? inject(ServiceB);
  }
}
```

This comes with the cost of a boilerplate code.

##### If customers want to use our services in other frameworks, we can introduce a facade `inject` function, exported from `@spartacus/core` that customers hook into
To mitigate the possible problems with porting our services implementation to other frameworks, we could introduce a facade `inject` function that would be exported from `@spartacus/core` and used by our services. We could allow customers to extend/hook into our `inject` function in case they want to opt out from the Angular's DI

Note: if we implement such a proxy, then we should forbid with ESlint rule a usage of the original Angular's `import { inject } from '@angular/core` function, for consistency.


### Option 2: Use `Injector` class instead of constructor parameters
Similar to using `inject` function from ng14, we can use the Angular `Injector` class, with its method `get()` to get the dependencies, instead of constructor parameters. This has been possible even before Angular 14. See the following example:

```ts
/* Injection via `Injector` class */

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
	
	// !! `Injector.get` allowed also lazily in runtime !!
	lazyMethod(){
		return this.injector.get(ServiceC).getData();
	}
}
```

This options has a significant disadvantage: the `Injector.get` method can be called lazily, anytime in the lifecycle of the service. So it's much harder to reason about dependencies of such a service.

Let's disqualify this option, as it is pretty much the same as Option 1 (`inject` function), but has only more disadvantages than Option 1.

## 5. Decision
Rejected.

Let's stick with constructor parameters for now (until we have a time to spike the option with `inject`).

Why:
- Not sure if the benefits of using `inject` outweigh the costs and risks
- Someone needs to spike it in a small portion and see if it's doable (what are potential obstacles and how much it costs to overcome them)
- At the moment, it's one of the lower priorities in our architectural backlog, because of relatively low return of investment
- When the way is more paved by the community using the new `inject` function, we might reconsider using it.

How soon we want to spike it? It depends on the prioritization of all the items in the architectural backlog.

## 6. Consequences
- Nothing changes, we still use constructor parameters for dependency injection
- we still add required constructor parameters only in Major releases and provide migrations for those breaking changes