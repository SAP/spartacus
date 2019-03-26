# Extendable Backend Connectors
The system landscape of a Commerce solution exists of various systems. The variety of systems and solutions are typically orchestrated on various application layers, including the frontend. While Spartacus is originally designed to work with the SAP Commerce Cloud, which offers a lot of features out-of-the-box, the backend loading mechanism is designed to leverage third-party systems. This allows to use alternative systems while still being able to leverage other parts of Spartacus.

An **example** of a frontend page that wires mutliple systems together is the cart page. This page is typically driven by multipe streams of content and data, including:
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

While SAP Commerce Cloud offers a single suite for all those features, there might be good reasons to use other systems for some of those features. This is where Extendable Backend Connectors kicks in. 

The JS connector logic exists of several pieces:
- A facade fronting the store, for components to interact with
- An in-memory store where data is being stored
- An adapter that  
  loads data from an exernal backend
  maps the backend model to the required UI model

