# Companies 
 
A simple Node+Angular project exposing a REST endpoint

Note: the following examples assume you are running the REST server locally on ort 8081. 

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

An individual Company can be retrieved by its ID using `GET` on the URI `/rest/companies/:id` where `:id` is the value of the Company's ID.
Below is an example of  
```shell script
curl -is http://localhost:8081/rest/companies/not-found
```
```log
HTTP/1.1 204 No Content
Server: restify
Date: Fri, 18 Oct 2019 09:49:20 GMT
Connection: keep-alive


```