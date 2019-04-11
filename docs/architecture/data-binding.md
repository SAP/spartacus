# Data binding
The system landscape of a Commerce solution exists of various systems. The systems are typically orchestrated on various application layers, including the frontend. While the Spartacus component UIs connect to SAP Commerce Cloud APIs by dfault, the underlying framework can be used to *adapt* other systems as well. This is done by so-called connectors which can be added to connect to other systems. 

## Component data binding
Spartacus delivers view logic that binds to (complex) commerce data and logic in the commerce backend. Angular provides standards for data binding and relies on reactive programming as the best practice standard pattern for data binding. A number of best practices are used for data binding:
- UI components bind to observable data from the backend, using Angulars standard `async`. 
- UI components do not store response data from observables locally, so that destroy logic can be avoided. RxJS *pipable* logic can be applied to implement any logic when data is observed.
- backend data is stored in a central data store, provided by a state management system (Spartacus uses ngrx). 
- The complexity of the state managment system is fronted by a facade layer to provide a simple API to component developers. 
- The backend system is configurable by connector, adapter and convertor logic. Cusomters can provide alternative implementations to adapt a specific backend. 

This design involves multiple layers:
- UI components  
  The UI layer is only concerned with view logic of the UI. UI components observes data provided by the facade layer. 
- facade layer   
  The facade layer hides the complexity of the in-memory data store (ngrx). This layer is designed to simplify your development, and let you focuss on custom view logic. 
- in-memory Store (ngrx)  
  Spartacus uses ngrx for state management. Ngrx is considered complex and therefor you can use the facade layer. 
- backend connector  
  The backend connector is called by ngrx *effects*, and return the response from the backend in the required UI model. The connector delegates to an adapter, which interacts with a backend system.

![Component data binding](component-data-binding.png)

While this is a pretty complex setup, you don't need to worry about most layers. When you like to connect a UI component to an alternative data source, you would customize some low level layers without being concerned with the facade layer or data store. Only if alternative client side business logic is required, you would provide additional logic, most likely close to the UI layer.  

## Connector Logic
The Connector logic sits between the in-memory data store (ngrx) and the backend. A specific connector per domain is used to offload the connection to a backend system. For example, the product connector takes care of loading product details. 

To provide optimal flexiblity there are three entities involed to connnect a backend system:
1. Connector
2. Adapter
3. Convertor

This is a common pattern cross different frameworks and technology stack, altough diferent names are used (i.e. convertor vs populator vs serializer, etc.). 
The finegrained setup will help to separate concerns and simplifies futher customisation. That being said, when you bind to an alternative data source, nothing stops you from simplifying this setup. 

### 1. Connector
The connector orchestrates the connection to a source system. The connector layer could be considered over-engineered, but there are occassions where standard data is provided, even in case of switching to an alternative system. An example of this is when structured CMS data is loaded; Spartacus can be setup to add static CMS data without relying on a backend at all or as a fallback in case the CMS doesn't provide sufficient data. 

The main task of the connector is to delegate the loading and conversion of backend data to the adapter. 

### 2. Adapter  
The adapter layer is responsible for loading and submitting data to a source system. By default, Spartacus adapts OCC, the standard REST API of SAP Commerce Cloud. The adapters (and convertors) are shipped and provided in separate modules, so that they become optional in the final build in case you like to adapt an alternative system.

The endpoints used in OCC adapters can be configured, so that the customisation of Spartacus can be very light-weight. Only if you adapt another system, it might be needed to provide a custom adapter. More on OCC endpoint configuration can be found further down in this page. 

Spartacus delegates the conversion of backend to UI models (and visa versa) to convertors. Convertors are optional, when no convertor is found for the given domain, the source data will be returned. 

### Convertor logic
Convertors are used to convert data from the backend to the UI and visa versa. Spartacus uses the following to distinquish the 2 flows:
- *Normalize* is the conversion from backend models to UI models
- *Serialize* is the conversion of UI models to backend models (in case of submitting data to the backend).

In order to provide optional conversion, the convertors are so-called multi-providers. This allows to provide specific convertors. A good example of an optional normalizer is the additional data that is required for the SmartEdit integration. This integration requires some additional attributes on final DOM. Spartucus *provides* an optional convertor that normalizes additional data from the backend source to the UI model. 

Convertors are optional. Whenever the backend model is equal to the UI model, or in case of simple conversion, the adapter could easily take care of this. 


## Endpoint configuration
REST endpoints provided by OCC are often configurable. Most endpoints have an optional field paramater that dictates the response data that is returned. While this configuration can also be driven by a (JAVA Spring) backend configured, doing this at runtime in the frontend gives more flexibility and limits customisations in the backend. 

To this reason, OCC modules in Spartacus allow for endpoint configuration. The below code snippet shows a custom configuration for the product detail endpoint

```typescript
backend: {
  occ: {
    baseUrl: environment.occBaseUrl,
    endpoints: {
    product:
        'products/${productCode}?fields=DEFAULT,customAttribute',
    }
  }
}
```

The OCC configuration is used in the `OccEndpointsService`. The service loos up the configuration and applies parameters to the endpoint if needed.
