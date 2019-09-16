# ma-assignment-echo-at-time-redis
## How to run application
### Preconditions
Redis should be available on port 6379.

- To start redis in docker just type command `yarn redis:start`
- To stop redis type command `yarn redis:stop`

### Running application
- Type command `yarn start`
- Debug purposes `yarn debug`

### Client
- Send message example `curl -X POST -d 'time=2019-09-16T00:10:50.474Z' -d 'message=test' http://localhost:3000/echoAtTime` (Please be careful with timezone. For Ukraine should be minus 3 hours)
- Post few messages for debug purposes `yarn seed`


## Todo
- Create class "Storage" and extend Queue from Storage. And move data access methods from Queue to Storage class.
- increase coverage
