
# Global Configuration in spartacus

Spartacus uses configuration mechanism which provides global app configuration at app bootstrap and is not changed while the app is running.

Each storefront module that is using configuration usually provides typing for its part of the configuration with some defaults. 

Any configuration provided can be overridden in the main app module.  


## How to use configuration

### StorefrontLib.withConfig

If you import StorefrontModule in your app, preferred and easiest method to provide configuration is to use `StorefrontModule.withConfig(config?: StorefrontModuleConfig)`.
`StorefrontModuleConfig` interface provides type safety and context-aware code completion that speed ups defining configuration and helps to avoid any typos.  

### ConfigModule.withConfig 

Importing `ConfigModule.withConfig(config: any)` is useful, when we want to use the configuration in our module and, at the same time, contribute to it.
`config` parameter is not typed, can be an object of any shape, so it suggested to either use typed const or use type casting `ConfigModule.withConfig(<ConfigType>{})` to utilize type safety. 

### provideConfig

Using `provideConfig` in providers array is best used in case we want to contribute to the global configuration without the need of 
importing ConfigModule, or when we want to implement module with providers and provide config conditionally. 

### ConfigModule.withConfigFactory / provideConfigFactory 

Works the same as their counterparts (`ConfigModule.withConfig`, `provideConfig`), but use factory instead of plain object to contribute configuration. Useful when we need
to do some config generation or composition.  

## Modifying configuration at runtime (after app started) 

Support for read/write configuration (that can be changed after app bootstrap) is not covered (and supported) by this mechanism, and usually
should be implemented using other methods, either by putting that information in a store or expose it in a service,
ideally as an observable stream (to easily react to changes). 
General advice would be, that any value that can change in time, should be a part of app state rather than part of the app configuration.

## Default values

Each module usually provides adefault configuration that is needed for basic functionality. There is no special way to
provide default configuration, it is provided in the same way as any other configuration. 
By default configuration we mean any configuration that is provided inside related module - usually it contains reasonable defaults or configuration that
is required for a module to operate. 

Not all required configuration must be provided with defaults, for example, it might be hard to come up with some reasonable 
defaults for some options. In this case, it is recommended to use ConfigValidators to validate configuration and warn customer (in development mode)
if required config is missing.  

## Overriding values

Configuration mechanism used in spartacus is built upon and subject to the rules of standard Angular Dependency Injection mechanism,
Each configuration chunk (default or override) is provided separately, with multi-provider feature and all chunks are merged 
in a factory used to inject configuration. 

### How merging process works?

Each configuration chunk is a plain JS object which contributes to one global configuration object, using deep object merging.
Benefits of this solutions are: flexibility, ability to enhance configuration in feature modules, ability to easily provide defaults
in modules, ability to override any part on the configuration on top (in shell app), ability to set configuration just before app bootstrap (e.g. using meta tags). 
  
Deep merging works only for objects, arrays are overwritten without merging. 

Some example of configuration merging:

- simple merge:

Chunk 1: `{ site: { occ-prefix: 'rest-api' } }`

Chunk 2: `{ site: { base-site: 'electronics' } }`

Merged: `{ site: { occ-prefix: 'rest-api', base-site: 'electronics' } }`


- merge with overwrite:

Chunk 1: `{ site: { occ-prefix: 'rest-api' } }`

Chunk 2: `{ site: { base-site: 'electronics', occ-prefix: 'aaa' } }`

Merged: `{ site: { occ-prefix: 'aaa', base-site: 'electronics' } }`


- array overwrite: 

Chunk 1: `{ config-values: ['a', 'b' ] }`

Chunk 2: `{ config-values: ['c'] }`

Merged: `{ config-values: ['c'] }`


### Order of provided configuration chunks

The order in which chunks are merged relies on the order in how they were provided, which basically means:

- If the configuration was defined using import ConfigModule.withConfig, order of imports is also defines order of chunks.
- The above also applies to modules that use ConfigModule.withConfig inside.
- Direct providing (using provideConfig or ConfigChunk token), will always overwrite configuration from imported modules (both ConfigModule.forRoot() and feature modules with default configuration).
- Each consecutive directly provided config chunk will be able to overwrite the previous one.    

If the configuration is provided in a module two level deep, i.e. imported module imports anther module (sub-module), which provides its 
configuration, then sub-module configuration technically must be provided before parent module is actually imported, so any configuration defined in the upper level
will always override it.   


## Config validators

Config validators can be easily used to implement runtime checks that will warn developers (by default, only in development mode) 
when the config not valid, i.e. some parts of the configuration are missing, some parts are mutually exclusive or some parts has wrong values. 

Config validator is a simple function that just returns validation error message in case of validation fail. 
Each config validator should be provided using `provideConfigValidator`.  


### Implementing configuration in new features

Configuration can be used out of the box, without any specific perquisites, using techniques described above.
However, below are the best practices explaining how to implement feature module that uses and contribute to global configuration:

1. Define an abstract class for your part of the configuration.

We recommend using an abstract class instead of an interface to not only provide typings but also an injection token, that will simplify configuration
usage inside your module (and in some advanced scenarios, could facilitate separate configuration for your module).

By convention, all Spartacus storefront modules are using `config` folder for this purpose, e.g. `my-module/config/my-module-config.ts` 

2. Define defaults

Export default configuration, preferably as a const typed plain object value.  
By convention, all spartacus modules are using `config` folder for this purpose, e.g. `my-module/config/default-my-module-config.ts`

3. Provide default to configuration 

In you feature module import `ConfigModule.withConfig(),` and pass default config there, e.g. `ConfigModule.withConfig(defaultMyModuleConfig),`

4. Provide global configuration using your typed abstract class  

This step is not technically needed, because you can always inject global config. However, it is recommended because defines proper config encapsulation,
allows for easy injection and provides type safety for your module. 

e.g. `{ provide: MyModuleConfig, useExisting: Config }`

5. Add interface to storefrontConfiguration type

If you are developing core storefront feature, to make your configuration options available to the customer 
to use with `StorefrontModule.withConfig()`, import and include your new type to global `StorefrontModuleConfig` type in  
`projects/storefrontlib/src/lib/storefront-config.ts`. 
