# Instructions:
  1. npm  install
  2. npm  test  
  3. npm start 

# Node version used :
  1. Node.js : v10.16.3
  # API Usage: 
  localhost:3030/api/v1/closest?zip=<zip>
  
  localhost:3030/api/v1/closest?address=<address>
  
  localhost:3030/api/v1/closest?zip=<zip>&units=<(mi|km)>
  
  # Example:
  localhost:3030/api/v1/closest?zip=10003
  
  
  localhost:3030/api/v1/closest?zip=10003&units=km


# How my solution works

  First I need to explain about Formula that I used in my code which is `haversine`
  haversine : The haversine formula determines the great-circle distance between two points on a sphere given their longitudes and latitudes. Important in navigation, it is a special case of a more general formula in spherical trigonometry, the law of haversines, that relates the sides and angles of spherical triangles.
 So , the idea is using haversine formula to get distance between the requested address and the stores then sort elements descending and getting the first element 


