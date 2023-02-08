# Eclipse GLSP - Server library for using JSON source models

A collection of reusable base handlers and services to implement GLSP diagram languages directly use JSON-based source model.
With this glue code two common base use cases can be covered:

-   One JSON model/file provides all information (semantic+ graphical notation)
-   Semantic and notation information are separated into two models/files. This separation makes it easier to add diagram capabilities
    to already existing model languages.

Where it makes sense the API is aligned with the `org.eclipse.glsp.server.emf` Java package which provides similar functionality for the
Java-based GLSP Server framework.

## More information

For more information, please visit the [Eclipse GLSP Umbrella repository](https://github.com/eclipse-glsp/glsp) and the [Eclipse GLSP Website](https://www.eclipse.org/glsp/).
If you have questions, please raise them in the [discussions](https://github.com/eclipse-glsp/glsp/discussions) and have a look at our [communication and support options](https://www.eclipse.org/glsp/contact/).

# Eclipse GLSP - Node Server

## Direct GModel Library

A collection of reusable base handlers and services to implement GLSP diagram languages directly use the graphical model as source model.
This means the source model is a serializable representation of the graphical model. All operation and action handlers are operating
directly on the graphical model.
