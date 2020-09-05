# Back-End Code Test

This is a node js express back-end application.

## Running the application

1. Setup `.env` file, with the contents `SERVER_PORT=5001`
2. Install required packages `npm install`
3. To start the application run `npm start`
4. To test the application use `npm test`

## How it works

This server accepts a `post` and `get` request on the `/` route.

With the `post` request you must pass json body (example shown below).
The server will return the correct customer depending on `customer-id`.
If it cannot find a customer id then it will fallback to the `username`
in `outputContext`.

With the `get` request it does not need any body. The server will return
all customers.

```json
{
  "queryResult": {
    "queryText": "End-user expression",
    "parameters": {
      "action": "identity-check",
      "customer-id": 1
    },
    "outputContexts": [
      {
        "name": "identity-check-intent",
        "lifespanCount": 5,
        "parameters": {
          "username": "zeeshan"
        }
      }
    ]
  }
}
```
