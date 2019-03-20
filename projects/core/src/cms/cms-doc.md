# Adapter pattern
The system landscape of a Commerce solution exists of various systems. The variety of systems and solutions are typically orchestrated on various application layers, including the frontend. While Spartacus is originally designed to work with the SAP Commerce Cloud, which offer a lot of features out of the box, the backend loading mechanism is designed to potentially leverage third-party systems. This allows customers to use alternative systems while still being able to leverage other parts of Spartacus.

An example of a frontend page that wires mutliple systems together is the cart page. The cart page is typically driven by multipe streams of content and data, including:
- cms (page) structure data  
  Allowing to control the page structure in a CMS system.
- cart data  
  Provides cart entries and totals
- promotion data  
  providing promotions details related to the cart
- product data  
  related to cart entries
- merchandizing content  
  ordinary messaging or campaign related content
- up and cross sell  
  product recommendations

While SAP Commerce Cloud offers a single suite to add all those features, there might be good reasons to use other systems for some of those features. This where configurable backend streams are designed for.


## Multi Source capabilities
In order to be flexible, you can use the following patterns to adapt an alternative backend:

**Endpoint configuration**  
Endpoint configuration provides a very easy way to switch to anoterh backend. This can be useful for small changes in the endpoint configuration (for example when another fields should be exposed).

**Custom Loaders**  
Custom loaders can be used to load data from an alternative headless system.

**Extendibile adapters**  
Adapters can be provided using the standard DI system of Angular. Adapters can be used to serialize the response data of a backend to meet the requried UI model.


## Fast setup
A key component of Spartacus is the CMS structure. The CMS structure is required to orchestrate pages and components. There are few important concepts that are used:
- Page  
- Page Template
- Page Slot
- Component

The CMS structure can be loaded from the CMS. A default implementation uses the SAP Commerce Cloud CMS, but you can adapt other CMS systems as long as you meet the  UI model of Spartacus component is met. 
