# Client API (version 1) <br/> Sessions Microservices Client SDK for Node.js

Node.js client API for Sessions microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [SessionV1 class](#class1)
* [ISessionsClientV1 interface](#interface)
    - [getSessions()](#operation1)
    - [getSessionById()](#operation2)
    - [openSession()](#operation3)
    - [storeSessionData()](#operation4)
    - [closeSession()](#operation5)
    - [deleteSessionById()](#operation6)
* [SessionsCommandableHttpClientV1 class](#client_http)
* [SessionsSenecaClientV1 class](#client_seneca)
* [SessionsDirectClientV1 class](#client_direct)
* [SessionsNullClientV1 class](#client_null)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "client-sessions-node": "^1.0.*",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('client-sessions-node');

// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};

// Create the client instance
var client = sdk.SessionsCommandableHttpClientV1(config);

// Open client connection to the microservice
client.open(null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Opens user session
    client.openSession(
        null,
        '123',
        'Test User',
        '192.168.1.1',
        'Test Client',
        null,
        null,
        function (err, session) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Opened user session is');
            console.log(activity);
                        
            // Get sessions for user 123
            client.getSessions(
                '123',
                null,
                null,
                function (err, sessions) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Opened user sessions are');
                    console.log(sessions);
                    
                    // Close connection
                    client.close(null); 
                }
            );
        }
    );
});
```

### <a name="class1"></a> SessionV1 class

Represents an open user session

**Properties:**
- id: string - unique session id
- user_id: string - unique user id
- user_name: string - Full user name just for information
- active: boolean - True if session is still active
- open_time: Date - date and time when session was opened
- request_time: Date - date and time when last request was processed
- close_time: Date - date and time when session was closed
- address: string - client address
- client: string - client application name
- user: Object - information about user
- data: Object - session data

## <a name="interface"></a> ISessionsClientV1 interface

If you are using Typescript, you can use ISessionsClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about ISessionsClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface ISessionsClientV1 {
    getSessions(correlationId, userId, callback);
    openSession(correlationId, user, address, client, data, callback);
    getSessionById(correlationId, sessionId, callback);
    storeSessionData(correlationId, sessionId, data, callback);
    closeSession(correlationId, sessionId, callback);
    deleteSessionById(correlationId, sessionId, callback);
}
```

### <a name="operation1"></a> getSessions(correlationId, filter, paging, callback)

Retrieves user sessions by specified criteria.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- filter: object - filter parameters
  - user_id: string - (optional) unique user id
  - active: boolean - (optional) active connections
  - from_time: Date - (optional) start of the time range
  - to_time: Date - (optional) end of the time range
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0)
  - take: int - (optional) page length (default: 100)
  - total: boolean - (optional) include total counter into paged result (default: false)
- callback: (err, sessions) => void - callback function
  - err: Error - occured error or null for success
  - sessions: DataPage<SessionV1> - page with user sessions

### <a name="operation2"></a> getSessionById(correlationId, sessionId, callback)

Loads user session by session id.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- sessionId: string - unique session id
- callback: (err, session) => void - callback function
  - err: Error - occured error or null for success
  - session: SessionV1 - open user session or null if session wasn't found

### <a name="operation3"></a> openSession(correlationId, userId, userName, address, client, user, data, callback)

Opens a new user session and stores user information in it.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- user_id: string - unique user id
- user_name: string - full user name
- address: string - client address
- client: string - client application name
- user: Object - user data
- data: Object - session data
- callback: (err, session) => void - callback function
  - err: Error - occured error or null for success
  - session: SessionV1 - newly opened user session or existing session if it was already opened for the same address and client

### <a name="operation4"></a> storeSessionData(correlationId, sessionId, data, callback)

Stores session data.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- sessionId: string - unique session id
- data: Object - session data
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
  - session: SessionV1 - updated session object

### <a name="operation5"></a> closeSession(correlationId, sessionId, callback)

Closes user session either by its id

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- session_id: (optional) string - unique session id
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
  - session: SessionV1 - closed session object

### <a name="operation6"></a> deleteSessionById(correlationId, sessionId, callback)

Deletes session by specified session ids.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- sessionId: string - unique session id
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
  - session: SessionV1 - deleted session object
 
## <a name="client_rest"></a> SessionsCommandableHttpClientV1 class

SessionsCommandableHttpClientV1 is a client that implements HTTP protocol

```javascript
class SessionsCommandableHttpClientV1 extends CommandableHttpClient implements ISessionsClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getSessions(correlationId, userId, callback);
    openSession(correlationId, user, address, client, data, callback);
    getSessionById(correlationId, sessionId, callback);
    storeSessionData(correlationId, sessionId, data, callback);
    closeSession(correlationId, sessionId, callback);
    deleteSessionById(correlationId, sessionId, callback);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - protocol: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> SessionsSenecaClientV1 class

SessionsSenecaClientV1 is a client that implements Seneca protocol

```javascript
class SessionsSenecaClientV1 extends CommandableSenecaClient implements ISessionsClientV1 {
    constructor(config?: any);        
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getSessions(correlationId, userId, callback);
    openSession(correlationId, user, address, client, data, callback);
    getSessionById(correlationId, sessionId, callback);
    storeSessionData(correlationId, sessionId, data, callback);
    closeSession(correlationId, sessionId, callback);
    deleteSessionById(correlationId, sessionId, callback);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - protocol: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_direct"></a> SessionsDirectClientV1 class

SessionsDirectClientV1 is a client that implements Seneca protocol

```javascript
class SessionsDirectClientV1 extends DirectClient implements ISessionsClientV1 {
    constructor(config?: any);        
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getSessions(correlationId, userId, callback);
    openSession(correlationId, user, address, client, data, callback);
    getSessionById(correlationId, sessionId, callback);
    storeSessionData(correlationId, sessionId, data, callback);
    closeSession(correlationId, sessionId, callback);
    deleteSessionById(correlationId, sessionId, callback);
}
```

## <a name="client_null"></a> SessionsNullClientV1 class

SessionsNullClientV1 is a client that implements Seneca protocol

```javascript
class SessionsNullClientV1 implements ISessionsClientV1 {
    getSessions(correlationId, userId, callback);
    openSession(correlationId, user, address, client, data, callback);
    getSessionById(correlationId, sessionId, callback);
    storeSessionData(correlationId, sessionId, data, callback);
    closeSession(correlationId, sessionId, callback);
    deleteSessionById(correlationId, sessionId, callback);
}
```
