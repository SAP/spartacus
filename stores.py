import random

count = 5000

template_file_name = 'stores-tmpl.impex'
file_name = 'stores.impex'

stores = []
addresses = []

for i in range(count):
  lat = random.uniform(-90, 90)
  long = random.uniform(-180, 180)
  store = f';CXSPA-1402-{i};CXSPA-1402-{i};STORE;CXSPA{i};{lat};{long};29.05.2025;;creche,sundayWorkshops;;$standardHours'
  stores.append(store)

  address = f';CXSPA{i};Clockhouse Place Bedfont Road;;TW14 8HD;Feltham;GB;+44 870 608 4000;CXSPA-1402-{i};'
  addresses.append(address)

with open(template_file_name, 'r') as file:
  data = file.read()
  data = data.replace('$$PointsOfService$$', '\n'.join(stores))
  data = data.replace('$$Addresses$$', '\n'.join(addresses))
with open(file_name, 'w') as file:
  file.write(data)
