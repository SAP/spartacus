# This file contains default values to use in your config.sh when @spartacus/epd-visualization is being included

ADD_EPD_VISUALIZATION=true

# This CCv2 server has been initialized with the 'epdvisualizationspartacussampledata' addon
# which creates 'electronics-epdvisualization-spa' and 'powertools-epdvisualization-spa' sites.
BACKEND_URL=https://api.cp96avkh5f-integrati1-d1-public.model-t.cc.commerce.ondemand.com

# Only powertools-epdvisualization-spa contains @spartacus/epd-visualization sample data at this point.
# Sample data may be added to electronics-epdvisualization-spa in the future.
BASE_SITE=powertools-epdvisualization-spa,electronics-epdvisualization-spa

# The base URL (origin) of the SAP EPD environment used for integration tests
EPD_VISUALIZATION_BASE_URL=https://epd-acc-eu20-consumer.epdacc.cfapps.eu20.hana.ondemand.com
