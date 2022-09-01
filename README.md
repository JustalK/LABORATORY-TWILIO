# LABORATORY-TWILIO

## Experiences

The information for connecting the code to our account are all shown on the dashboard of our app.
Under the app that I am using for thie laboratory.

![./documentation/3.png](./documentation/3.png)

#### Experience1: Sendind a SMS using twilio

For sending a sms using twilio, you need to add your number in the **Verified Caller IDs** if you are using the trial version.
You can find this in the tab `develop` -> Phone numbers -> Manage -> Verified Caller IDs.

![./documentation/1.png](./documentation/1.png)

In the `api` project, the app.tsx is responsible for sending a SMS.

```js
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

app.post("/send-sms", async (req, res, next) => {
  const { number } = req.body;

  const message = await client.messages.create({
    body: "This is the ship that made the Kessel Run in fourteen parsecs?",
    from: process.env.TWILIO_NUMBER,
    to: number || process.env.MY_NUMBER,
  });

  res.json(number);
});
```

The log of the message can be see in the tab `Monitor` -> Logs -> Messaging

![./documentation/2.png](./documentation/2.png)

#### Experience2: Serverless twilio function

Twilio has a serverless system for handling call and message sent to our active numbers.

When a person is calling our number the system send a request to the twilio function gateway. This gateway will try to validate the request and if everything went fine, it will transform this call into a payload for our function. In our function, we can play a song, play a text, take the input of the person calling and so on... Once the function has been executed, the response is sent back to the client through the gateway. The mermaid under show the principle:

![./documentation/mermaid.png](./documentation/mermaid.png)

**By the interface**

It's possible to define everything from twilio itself. In the tab `develop` -> Explore Product -> Functions and assets.

![./documentation/4.png](./documentation/4.png)

In the example above, I have define a simple conditionnal response if a SMS is sent to my number. In case the message contains `alt`, my function will take care to answer back `Good job`, in the contrary the message under will be sent back to the person texting.

For defining which function to play when receiving a message. We need on the active number page located in tab `develop` -> Phone numbers -> Manage -> Active Numbers. At the bottom of the page, we can chose which webhook or function to play when a message arrive. In my case, I choose the function created on the previous screenshot: `test-example`.

![./documentation/5.png](./documentation/5.png)
![./documentation/6.png](./documentation/6.png)

**By Code**

Of course, everything can be handle by code. The entire interface has a crud for every part of the serverless. I have defines some of them in the api in the file `experience2`. For example, for creating a service, a simple call using our credential can be done as follow:

```js
router.post("/service", async (req, res) => {
  const { name } = req.body;

  const service = await client.serverless.v1.services.create({
    includeCredentials: true,
    uniqueName: crypto.randomBytes(20).toString("hex"),
    friendlyName: name,
  });

  res.json(service);
});
```

The response to this call is a SID, that will be used in almost all the other request. We particularly need it for the upload of function. If I have to use Twilio response, I will certainly do it this way:

- Create the entire service, environment and function using the interface where nobody have access
- In our project, the scripts will be sent to our repository and using a curl in the pipeline or a node.js script, I will upload the function on twilio. This way I have control over the twilio access.

#### Experience3: Getting the logs of the messages

Just a simple example of how to get the logs of the message, it can be quite interesting if it need to be use on an external website
