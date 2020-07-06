## Weather API 
The APP can be run with docker-compose up
I added pgadmin to docker compose to manage PostgreSQL dbs.
It can be reached at localhost:5050 with the username, password provided in the docker-compose.yml file.
I chose PostgreSQL for db.

## API endpoints
GET /cities 
Returns all cities in the db with the latest forecast in the forecast array.

POST /cities
Creates a new city. Name and Timezone fields are required. Example: { name: 'Budapest', timezone: 'Europe/Budapest' }

GET /cities/locked
Returns all cities in the system where locked property is set to true. Locked cities cannot be updated or deleted.

GET /cities/:id
Finds the city with the given id and returns it with all of its forecasts

PATCH /cities/:id
Updates city name and timezone Example: { name: 'Budapest', timezone: 'Europe/Budapest' }

PATCH /cities/:id/add-forecast
Adds the forecast to city with the given id. Example: { id: 1, forecast: 'Sunny', 'from: 2020-05-15', to: '2020-05-20' }
Forecast is added only if from date is smaller than to date and also forecast property has enum validation, so only the 3 given values can be used.

PATCH /cities/:id/lock
Finds the city with given id. Sets its locked property to true and adds the current date to locked_at to be able to calculate how much time passed since the lock.

PATCH /cities/:id/unlock
Finds the city with given id and unlocks it if more than 10 minutes passed since it has been locked.

DELETE /cities/:id
Deletes the city with the given id.

DELETE /cities/:id/last-forecast
Finds the city with the given id then deletes its most recent forecast.

GET /forecasts/latest
Finds and returns the latest forecast in the system with the city.



