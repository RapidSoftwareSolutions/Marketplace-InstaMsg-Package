[![](https://scdn.rapidapi.com/RapidAPI_banner.png)](https://rapidapi.com/package/InstaMsg/functions?utm_source=RapidAPIGitHub_InstaMsgFunctions&utm_medium=button&utm_content=RapidAPI_GitHub)

# InstaMsg Package
InstaMsg is a real time messaging and connectivity platform for Internet of Things.
* Credentials: clientKey, clientSecret

## How to get credentials: 
1. [Log onto your InstaMsg](https://platform.instamsg.io) account.
2. Create your [App](https://platform.instamsg.io/#/apps)
3. Obtain a Api Key and Api Secret

## Custom datatypes:
 |Datatype|Description|Example
 |--------|-----------|----------
 |Datepicker|String which includes date and time|```2016-05-28 00:00:00```
 |Map|String which includes latitude and longitude coma separated|```50.37, 26.56```
 |List|Simple array|```["123", "sample"]```
 |Select|String with predefined values|```sample```
 |Array|Array of objects|```[{"Second name":"123","Age":"12","Photo":"sdf","Draft":"sdfsdf"},{"name":"adi","Second name":"bla","Age":"4","Photo":"asfserwe","Draft":"sdfsdf"}] ```

## Warn
To be able to use **publishMessage** block, you should:
1. When you create client with **createClient** block, provide value to `pubTopics` field. For example: 
```json
"pubTopics": ["pub1"]
```
2. When you call **publishMessage** block, provide `topic` field with value which you set in **createClient** block.
Example: 
```json
"topic": "pub1"
```

## InstaMsg.getAccessToken
Requests an access token.

| Field        | Type       | Description
|--------------|------------|----------
| clientKey    | credentials| InstaMsg Client Key.
| clientSecret | credentials| InstaMsg Client Secret.

## InstaMsg.invalidateAccessToken
Invalidating an access token.

| Field        | Type       | Description
|--------------|------------|----------
| clientKey    | credentials| InstaMsg Client Key.
| clientSecret | credentials| InstaMsg Client Secret.
| token        | String     | Access Token to invalidate.

## InstaMsg.createTenant
Creates a Single Tenant.

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| name           | String| Name of the tenant example `Company 1`
| description    | String| A short description of your tenant.
| maxClients     | Number| Max no of clients, which can be created in this Tenant. This can be used effectively to ration clients for a tenant.
| maxMessages    | Number| Max no of messages, which can be send by all clients of this tenant. This can be used to prevent abuse of messages by a tenant. Example from your purchase 1 million messages and you want to allot 10000 messages to this Tenant.

## InstaMsg.getTenants
List all Tenants
""
| Field          | Type   | Description
|----------------|--------|----------
| accessToken    | String | OAuth2 Access Token from `getAccessToken` method.
| active         | Boolean| Possible values: 0, 1. Will list active or inactive tenants. If the filter is omitted it will return both active and inactive tenants.

## InstaMsg.getSingleTenant
View a Tenant

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| id             | String| Tenant ID.

## InstaMsg.updateTenant
Update a Tenant

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| id             | String| Tenant ID.
| name           | String| Name of the tenant example `Company 1`
| description    | String| A short description of your tenant.
| maxClients     | Number| Max no of clients, which can be created in this Tenant. This can be used effectively to ration clients for a tenant.
| maxMessages    | Number| Max no of messages, which can be send by all clients of this tenant. This can be used to prevent abuse of messages by a tenant. Example from your purchase 1 million messages and you want to allot 10000 messages to this Tenant.

## InstaMsg.deleteTenant
Delete a Tenant

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| id             | String| Tenant ID to delete.

## InstaMsg.createClient
Create a Client

| Field            | Type   | Description
|------------------|--------|----------
| accessToken      | String | OAuth2 Access Token from `getAccessToken` method.
| tenantId         | String | Tenant ID.
| type             | Select | The Client type. Takes any of the two values - `device` or `user`. `device` represents a IoT device client, and `user` represents a user client.
| name             | String | Name of the tenant. For example, `Company 1`
| description      | String | A short description of the Client.
| subTopics        | List  | Array of sub topics to which the Client can subscribe.
| pubTopics        | List  | Array of pub topics to which the Client can publish messages to.
| secureCertEnabled| Boolean| Will client-certificate-authentication take place when client connects to server. Can take values `true` or `false`.
| provisioningId   | String | Usually IMEI-Number for GPRS devices; MAC-ID for LAN and Wifi devices. But this can be any globally unique alpha-numeric string. For example, the device's UUID/Serial-Number.
| provisioningKey  | String | An alphanumeric (0-9 and A-Z) key of length greater than 5 and less than 13. The key is case sensitive, therefore `KEY01` and `key01` are two different keys.
| gsmMsisdn        | String | The mobile phone number of the SIM that is used in the device, entered by the user in your app during provisioning process. Please note that here just the mobile-number should be entered, without any country-code or anything.
| gsmApn           | String | This is the Access Point Name (APN) of the mobile network.
| gsmUsername      | String | The user name for your APN.
| gsmPassword      | String | The password for your APN.
| gsmSimPin        | String | The PIN for your SIM.
| gsmSendSms       | String | If this field is `1`, the sms is sent to the GSM-device with the provisioning parameters.
| gsmIsdCode       | String | Country-Code. For example, for India the code would be `+91`

#### `subTopics` field example: 
```json
{
	"subTopics": ["sub1", "sub2"]	
}
```

#### `pubTopics` field example: 
```json
{
	"pubTopics": ["pub1", "pub2"]	
}
```

## InstaMsg.getClients
List all Clients

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.


## InstaMsg.getSingleClient
View a Client

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.
| clientId       | String| Client ID.

## InstaMsg.updateClient
Update a Client

| Field            | Type   | Description
|------------------|--------|----------
| accessToken      | String | OAuth2 Access Token from `getAccessToken` method.
| tenantId         | String | Tenant ID.
| clientId         | String | Client ID.
| type             | Select | The Client type. Takes any of the two values - `device` or `user`. `device` represents a IoT device client, and `user` represents a user client.
| name             | String | Name of the tenant. For example, `Company 1`
| description      | String | A short description of the Client.
| subTopics        | List  | Array of sub topics to which the Client can subscribe.
| pubTopics        | List  | Array of sub topics to which the Client can publish messages to.
| secureCertEnabled| Boolean| Will client-certificate-authentication take place when client connects to server. Can take values `true` or `false`.
| provisioningId   | String | Usually IMEI-Number for GPRS devices; MAC-ID for LAN and Wifi devices. But this can be any globally unique alpha-numeric string. For example, the device's UUID/Serial-Number.
| provisioningKey  | String | An alphanumeric (0-9 and A-Z) key of length greater than 5 and less than 13. The key is case sensitive, therefore `KEY01` and `key01` are two different keys.
| gsmMsisdn        | String | The mobile phone number of the SIM that is used in the device, entered by the user in your app during provisioning process. Please note that here just the mobile-number should be entered, without any country-code or anything.
| gsmApn           | String | This is the Access Point Name (APN) of the mobile network.
| gsmUsername      | String | The user name for your APN.
| gsmPassword      | String | The password for your APN.
| gsmSimPin        | String | The PIN for your SIM.
| gsmSendSms       | String | If this field is `1`, the sms is sent to the GSM-device with the provisioning parameters.
| gsmIsdCode       | String | Country-Code. For example, for India the code would be `+91`

#### `subTopics` field example: 
```json
{
	"subTopics": ["sub1", "sub2"]	
}
```

#### `pubTopics` field example: 
```json
{
	"pubTopics": ["pub1", "pub2"]	
}
```

## InstaMsg.deleteClient
Delete a client

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.
| clientId       | String| Client ID.

## InstaMsg.getClientAuthToken
Get Client Auth Token. You can get the auth token of Clients of type `user`.

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.
| clientId       | String| Client ID.

## InstaMsg.getClientInfo
List Client Info

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.
| clientId       | String| Client ID.

## InstaMsg.getClientNetworkLogs
InstaMsg Client libraries also push network information to the InstaMsg server. Network logs are very important to troubleshoot IoT device sites that have a poor network.

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.
| clientId       | String| Client ID.
| start          | DatePicker| The start date time
| end            | DatePicker| The end date time
| macId          | String| Hexified-MAC-Id of the network interface.
| imei           | String| The imei of the network interface.
| msisdn         | String| The mobile phone number if the device has multiple sim cards.
| iccid          | String| The sim number if the device has multiple sim cards.

## InstaMsg.getClientSessions
You can get the client session details using the Client Sessions API.

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.
| clientId       | String| Client ID.
| start          | DatePicker| The start date time.
| end            | DatePicker| The end date time.

## InstaMsg.getClientMetrics
List Client Metrics

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.
| clientId       | String| Client ID.
| interval       | String| The interval over which the metrics should be aggregated. Valid value are `day` and `month`. `day` aggregates the metrics over last 24 hours while month over the last 30 days. The default is last 24 hours.

## InstaMsg.getClientLogs
Client Logs are important to if you want to know what is happening at the client end (e.x. the client embedded in the IoT device) and the InstaMsg server end. You can use these logs to troubleshoot your clients.

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.
| clientId       | String| Client ID.
| start          | DatePicker| The start date time.
| end            | DatePicker| The end date time.
| level          | String| Level of logs `DEBUG` , `INFO`, `WARN`, `ERROR`, `FATAL`.
| creator        | String| The creator of the logs. It can have two valid values `InstaMsg` and `client`.

## InstaMsg.updateClientAuthToken
Client Update Auth-Token

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.
| clientId       | String| Client ID.

## InstaMsg.updateClientCertificate
Client Update certificate

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.
| clientId       | String| Client ID.

## InstaMsg.getFiles
List all client's Files

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.
| clientId       | String| Client ID.

## InstaMsg.downloadFile
Download a File

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.
| clientId       | String| Client ID.
| filename       | String| File Name to download.

## InstaMsg.deleteFile
Delete a File

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant id.
| clientId       | String| Client ID.
| filename       | String| File Name to delete.

## InstaMsg.getClientConfig
View Client Config

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant id.
| clientId       | String| Client ID.

## InstaMsg.updateClientConfig
Update Client-Config

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant id.
| clientId       | String| Client ID.
| config         | JSON  | This is a Json Object of the Config key and values. Each config is represented as a Key and Value in the Json. The JSON is defined by Client side application and InstaMsg only assumes it to be a valid Json.

#### `config` field example: 
```json
"config": {
    "MEDIA_STREAMING_ENABLED": 1, 
    "PING_REQ_INTERVAL": 180, 
    "COMPULSORY_SOCKET_READ_AFTER_MQTT_PUBLISH_INTERVAL": 3, 
    "BUSINESS_LOGIC_INTERVAL": 420
}
```

## InstaMsg.deleteClientConfig
Delete Client-Config

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant id.
| clientId       | String| Client ID.

## InstaMsg.publishMessage
Publish A Message

| Field          | Type   | Description
|----------------|--------|----------
| accessToken    | String | OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String | Tenant id.
| clientId       | String | Client ID.
| id             | String | The Message ID is a 16-bit unsigned integer that must be unique among the set of `in flight` messages in a particular direction of communication with a client. On your server side code you should maintain an map of client id, message id and reply handler or callback. When you receive a reply for a message. Set it to `null` for QOS 0 messages.
| type           | Select | The message type. Values can be `pub`, `p2p`. To publish a message set it to `pub`.
| topic          | String | Topic string can be any valid UTF-8 string of length limited to 64k. Topic string are case sensitive. So `TOPIC` and `topic` are two different topic. 
| payload        | String | This is a UTF-8 encoded string. If your message contains characters not represented in UTF-8 encode your message in base64 or hex.
| qos            | Number | This is the Quality of Service (QOS) level for message delivery. Valid values are: `1`: AT MOST ONCE; `2`: AT LEAST ONCE; `3`: EXACTLY ONCE
| duplicate      | Boolean| If you are re-sending this message set this to False i.e. 0.
| save           | Boolean| If you want the message to be stored on InstaMsg cloud.

## InstaMsg.getMessages
You can list all messages exchanged by a client.

| Field          | Type  | Description
|----------------|-------|----------
| accessToken    | String| OAuth2 Access Token from `getAccessToken` method.
| tenantId       | String| Tenant ID.
| clientId       | String| Client ID.
| start          | DatePicker| The start date time.
| end            | DatePicker| The end date time.
| type           | Select| The message type. Takes any of the two values `pub` or `p2p`.
