Your task is to write a simple application server that prints a message at a given time in the future.


The server has only 1 API:



echoAtTime - which receives two parameters, time and message, and writes that message to the server console at the given time.

Since we want the server to be able to withstand restarts it will use Redis to persist the messages and the time they should be sent at.

You should also assume that there might be more than one server running behind a load balancer (load balancing implementation itself does not need to be provided as part of the answer).

In case the server was down when a message should have been printed, it should print it out when going back online.



The application should preferably be written in Node.js.



The focus of the exercise is:

the efficient use of Redis and its data types

messages should not be lost

the same message should be printed only once

message order should not be changed

should be scalable

seeing your code in action (SOLID would be a plus)

use only redis.io
Please, review the assignment and let me know when you will be able to return it back.

If you have any other questions about the assignment, please don't hesitate to ask! We are here to help you!

Good luck with the assignment, and I am looking forward to reading your answers.
