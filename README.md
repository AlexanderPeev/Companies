# Companies 
 
This is a simple Node+Angular project exposing a REST endpoint

## REST API 
The source code of the REST API is located under the `server` directory. 
The backend is based on `Restify` and currently relies on a `retinkdb` instance for storage of its data. 

The REST API project can be run with the following commands: 
```shell script
npm install --no-save
npm run run "absolute/path/to/built/angular/client/app" 8081 "absolute/path/to/rethinkdb/executable"
```

Note: the following examples assume you are running the REST server locally on ort 8081. 

### Listing 
The Company resource can be listed by using `GET` on the URI `/rest/companies` as demonstrated below: 
```shell script
curl -is http://localhost:8081/rest/companies/
```
```log
HTTP/1.1 200 OK
Server: restify
Content-Type: application/json
Content-Length: 2
Date: Fri, 18 Oct 2019 09:46:32 GMT
Connection: keep-alive

[]
```

### Get By ID
An individual Company can be retrieved by its ID using `GET` on the URI `/rest/companies/:id` where `:id` is the value of the Company's ID.
Below is an example of a request, which attempts to retrieve a Company, which does not exist and receives a `204 No Content` status: 
```shell script
curl -is http://localhost:8081/rest/companies/not-found
```
```log
HTTP/1.1 204 No Content
Server: restify
Date: Fri, 18 Oct 2019 09:49:20 GMT
Connection: keep-alive


```

### Create
A Company can be created using `POST` on the URI `/rest/companies`.
Below is an example of a request, which creates a new company and receives the created JSON object along with a `200 OK` status: 
```shell script
curl -is http://localhost:8081/rest/companies/ -X POST -H "Content-Type: application/json" -d \
'{
    "name": "Narnia Holding",
    "address": "Narnia street 1",
    "city": "Cair Paravel",
    "country": "Narnia"
}'
```
```log
HTTP/1.1 200 OK
Server: restify
Content-Type: application/json
Content-Length: 150
Date: Fri, 18 Oct 2019 10:42:48 GMT
Connection: keep-alive

{"address":"Narnia street 1","city":"Cair Paravel","country":"Narnia","id":"f230ff35-f154-4fd4-9da2-7ab063ab6847","name":"Narnia Holding","version":1}
```

The created company can later be retrieved using the ID returned in the response of the create request: 
```shell script
curl -is http://localhost:8081/rest/companies/f230ff35-f154-4fd4-9da2-7ab063ab6847
```
```log
HTTP/1.1 200 OK
Server: restify
Content-Type: application/json
Content-Length: 150
Date: Fri, 18 Oct 2019 10:46:47 GMT
Connection: keep-alive

{"address":"Narnia street 1","city":"Cair Paravel","country":"Narnia","id":"f230ff35-f154-4fd4-9da2-7ab063ab6847","name":"Narnia Holding","version":1}
```

### Update
A Company can be updated using `PUT` on the URI `/rest/companies/:id` where `:id` is the value of the Company's ID.
Below is an example of a request, which updates an existing company and receives the updated JSON object along with a `200 OK` status:
```shell script
curl -is http://localhost:8081/rest/companies/f230ff35-f154-4fd4-9da2-7ab063ab6847 -X PUT -H "Content-Type: application/json" -d \
'{
    "version": 1,
    "name": "Narnia Holding v2",
    "address": "Narnia street 1a",
    "city": "Cair Paravel",
    "country": "Narnia"
}'
```
```log
HTTP/1.1 200 OK
Server: restify
Content-Type: application/json
Content-Length: 154
Date: Fri, 18 Oct 2019 10:53:45 GMT
Connection: keep-alive

{"address":"Narnia street 1a","city":"Cair Paravel","country":"Narnia","id":"f230ff35-f154-4fd4-9da2-7ab063ab6847","name":"Narnia Holding v2","version":2}
```
The version field must match the latest version on the object, otherwise a `209 Conflict` status will be issued. The version field is automatically incremented on each update. 

### Delete
A Company can be deleted using `DELETE` on the URI `/rest/companies/:id` where `:id` is the value of the Company's ID.
Below is an example of a request, which deletes an existing company and receives a `204 No Content` status:
```shell script
curl -is http://localhost:8081/rest/companies/f230ff35-f154-4fd4-9da2-7ab063ab6847 -X DELETE
```
```log
HTTP/1.1 204 No Content
Server: restify
Date: Fri, 18 Oct 2019 11:06:44 GMT
Connection: keep-alive


```

## Angular
The angular application is served along with the REST API and can be accessed at the root path. 

The source code of the Angular Client is located under the `client` directory. 

The Angular Client project can be run with the following commands: 
```shell script
npm install --no-save
npm run start
```
Afterwards the client project can be accessed at http://localhost:4200/

Additionally some REST mocks can be served alongside by starting: 
```shell script
npm run rest-mocks
```
Afterwards a `ng-apimock` admin interface can be accessed at http://localhost:4300/mocking