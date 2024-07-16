## Overview

Utility NodeJS package for handling application authentication to make Kibo Commerce API calls

## Features
* Kibo Application Authentication


## Installation

To install:
```
npm install @kibocommerce/sdk-authentication
```

## Configuration

The following data is required to authenticate with Kibo Commerce platform

- `authHost` - Kibo Commerce Authentication Host Server. It is used to request an access token from Kibo Commerce OAuth 2.0 service. Production and Production sandbox, use `home.mozu.com`
- `clientId` - Unique Application (Client) ID of your Application
- `sharedSecret` - Secret API key used to authenticate application. Viewable from your [Kibo eCommerce Dev Center](https://mozu.com/login)

Visit [Kibo documentation](https://api-docs.kibocommerce.com/reference/getting-started-with-your-api#how-to-authenticate) for more details on API authentication

## Usage

```js
// import API Auth Client
import { APIAuthClient } from '@kibocommerce/sdk-authentication'

// configuration parameters
const config = {
  clientId: 'client_id'
  sharedSecret: 'secret',
  authHost: 'home.mozu.com'
}

const apiAuthClient = new APIAuthClient(config, fetch)
const kiboAccessToken = await apiAuthClient.getAccessToken()

const response = await fetch('https://some-kibo-api', { headers: { 'Authorization': `Bearer ${kiboAccessToken}` }})
```

#### Without Native Fetch
For Node version < 18 or if a custom fetch client is required

```js
// import API Auth Client
import { APIAuthClient } from '@kibocommerce/sdk-authentication'

// import Fetch API compatible client
import fetch from 'node-fetch';

// configuration parameters
const config = {
  clientId: 'client_id'
  sharedSecret: 'secret',
  authHost: 'home.mozu.com'
}

const apiAuthClient = new APIAuthClient(config, fetch)
const kiboAccessToken = await apiAuthClient.getAccessToken()

const response = await fetch('https://some-kibo-api', { headers: { 'Authorization': `Bearer ${kiboAccessToken}` }})
```

## Token Refresh

Kibo Commerce access tokens are valid for one hour and reuse is suggested. This package will automatically handle the refresh of tokens.
The client constructor takes an optional "authTicketCache"

A simple example for an in memory cache:
```js
interface AuthTicketCache {
    getAuthTicket: (clientId:string) => Promise<AppAuthTicket | undefined>
    setAuthTicket: (clientId: string, kiboAuthTicket: AppAuthTicket) => void
}
const memo = {}
const memCache: AuthTicketCache = {
  getAuthTicket: async (clientId:string) => {
    return memo[clientId]
   },
  setAuthTicket: (clientId: string, kiboAuthTicket: AppAuthTicket) => {
    memo[clientId] = kiboAuthTicket
  }
}
// import API Auth Client
import { APIAuthClient } from '@kibocommerce/sdk-authentication'

// import Fetch API compatible client
import fetch from 'node-fetch';

// configuration parameters
const config = {
  clientId: 'client_id'
  sharedSecret: 'secret',
  authHost: 'home.mozu.com'
}

const apiAuthClient = new APIAuthClient(config, fetch, memCache)
const kiboAccessToken = await apiAuthClient.getAccessToken()

```
