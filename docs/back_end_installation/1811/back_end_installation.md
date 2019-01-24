The Spartacus JavaScript Storefront uses SAP Commerce Cloud for its back end, and makes use of the sample data from the B2C Accelerator electronics storefront in particular.

Note: The latest release of SAP Commerce Cloud is recommended. These instructions are based on a setup with SAP Commerce Cloud Release 1811 as the back end.

Perform the following steps to set up your back end:

* Install a new instance of SAP Commerce Cloud using the `b2c_acc_plus` recipe, as follows:

   1. In the `installer/recipes` folder of SAP Commerce Cloud, make a copy of `b2c_acc_plus` and call it `b2c_for_spartacus`.

   2. Delete the existing `build.gradle` file in the `b2c_for_spartacus` recipe folder. 

   3. Add this [build.gradle](build.gradle) file to your `b2c_for_spartacus` recipe folder.

   4. Follow the instructions in https://help.hybris.com/1811/hcd/8c46c266866910149666a0fe4caeee4e.html to install, initialize and start a new instance of SAP Commerce 1811, using `b2c_for_spartacus` as the recipe name.

* Import `spartacus_sample_data.impex`, which you can download here: https://help.hybris.com/1808/api/spartacus/spartacus_sample_data.impex

  For more information on importing ImpEx, see https://help.hybris.com/1811/hcd/2f095d195c0740aab4b0bbdf0f0a2d12.html. 

* Configure your OCC client, as described here: https://help.hybris.com/1811/hcd/627c92db29ce4fce8b01ffbe478a8b3b.html#loio4079b4327ac243b6b3bd507cda6d74ff