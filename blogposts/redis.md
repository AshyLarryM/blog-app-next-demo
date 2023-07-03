---
title: 'Redis & Caching for Noobs'
date: '7-3-2023'
---

## What is Redis?
- Redis is an in-memory data structure store with the ability to be used as a database, cache and message broker.  In this post we will be discussing its usage as a database and caching.
  
### Where does Redis live in the tech stack?
- Redis sits in front of your database.  Any time that you have a query to your database that takes time, or data that is accessed frequently but does not change often,  this data will be stored inside of Redis and your database.  When the user goes to retrieve that information from the database, if already cached, the data will return significantly faster since it is cached inside of Redis and doesn’t need to be accessed from the database.

_**How is the data stored in Redis?**_
- _In Redis all data is stored inside of "Key Value Pairs"_

#### What does in-memory data mean?
In-memory data refers to data that is stored in the main memory(RAM) of a computer, rather than on a traditional disk stoage format like a hard drive or solid state drive.
- Pros:
    - Primary advantage is speed.  Accessing data from RAM is significantly faster than access data from disk formats.  This can result in reads and writes being drastically faster and increasing application performance.
    - 
- Cons:
  - RAM is more expensive.
  - Volatile Data (_data is lost if the machine is goes down or restarts._)

#### Why would I use a database that can lose its data during a shutdown or restart?
- Redis is not typically used as a stand-alone database.  Redis is used for caching data from an additional database within the application.  To avoid the issue of data volatility in Redis, a Redis database can be configured to periodically save the dataset to disk  or append each command to a log.  In this instance even a loss of power will not result a complete data loss.  With snapshots, data can be retreived from the most recent snapshot taken or rebuilt with the command log.

#### But what does _Caching_ do, and how is it useful to my application?
- Caching is a technique used in computing to store data in a temporary storage area, called a _cache_.  The cache allows for future requests of that same data to be accessed at a later time.  In the use case of Redis, a user may want to access their data from the database. When the application goes to access the data from the API, it first checks the cache to see if the data can be retrieved from the Redis database(this is known as a cache hit).  If the data is located in the cache, it can be accessed much faster than if it had to be retreived from the primary database.  If the data is not in the cache(cache miss) the application retrieves the data from the original database, and the data is stored in the Redis cache to be accessed at a later time.

#### What about cost?
- Caching can actually reduce the cost associated with accessing data.  For example, if we had our data stored in a MySQL database, we could significantly reduce the number of reads to the databae by only accessing the data that was cached instead of directly calling the MySQL database for every single read.  This works best with data that does not change frequently.  While reducing the number of reads to your primary database, you also are increasing the performance during cache hits since the data is stored in-memory in Redis.
  
### Acceptable Use Cases
- Web page content: If your website serves up static content that doesn't change often, it's beneficial to cache the HTML output of the pages. This way, for each request, your server doesn't have to construct the HTML from scratch, which might involve complex database queries and template rendering.

- API responses: If you have an API endpoint that performs complex calculations or fetches data from a third-party service and the data does not change frequently, you can cache the responses. When the same or similar request comes in, you can provide the data from the cache, thus reducing the latency and load on your system.

- Database query results: Some database queries can be resource-intensive and slow, especially if they involve joining large tables or scanning many rows. If the underlying data doesn't change frequently, you can cache the query results and return them for subsequent similar requests, reducing the load on your database.

- User sessions: In web applications, user session data can be cached for quick access. This improves performance because you don't have to hit your primary database every time you need to authenticate a user or look up their session information.

- Configuration data: If your application uses configuration data that doesn't change often and is frequently accessed, it can be beneficial to cache this data. For example, application settings, feature toggles, or other similar data could be good candidates for caching.

### Application Work flow for Cache Hits/Misses
_If we are running a standard web application the dataflow may look something like this:_
#### Cache Hit:
1. The client makes a request to the API server, asking for specific data of their user profile.
2. THe API receives the request and contructs a key based on the request parameters(user_id)
3. The API first checks to see if Redis has a cached response for this particular key.
4. If the key exists in Redis, the API retrieves the cached data.
5. The API then sends the cached data back to the client.
#### Cache Miss:
1. The client makes a request to the API server, and asks for their user profile data.
2. API receives the request and constructs a key based on the request parameters.
3. The API again checks Redis before checking the database to see if there is a cached response for the user_id.
4. In this instance there is no key in Redis for the user_id.  The API must now retrieve the data from the database.
5. Once the data is retrieved from the database, the API also stores the retrieved data that was no cached in the original query, with the constructed user_id key, so in the future the data can be served directly from Redis and not access the database.
