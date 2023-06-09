---
title: 'Create a mailing list using MailChimp API'
date: '6-9-2023'
---

### [Visit public Repository here](https://github.com/AshyLarryM/blog-app-next-demo)

_**Adding a mailing list signup to your own application**_

- In this blog, we will explore how to create a mailing list using MailChimp, how to create a front end for a smooth user sign-up experience, and how to create an API route to send a request to MailChimp for a new subscriber that returns a response that confirms a successful signup, or returns an error if the signup was unsuccessful. To see an example of the final product, click the mailing list icon on this blog to see what the final product will look like. Here is also a link to the public GitHub Repository.

### Creating an API Route in Next.js 13.4
- With different versions of Next.js 13, there have been multiple ways to fetch data. We are using Next.js 13.4 here and going by the current documentation on how to create a Route Handler.  ***Note: you dont have to create an API folder to house all of your routes, but I find it easier to organize so that is what we will do.***

## Required npm installations for MailChimp
```
npm install @mailchimp/mailchimp_marketing
```
```
npm i --save-dev @types/mailchimp_mailchimp_marketing
```
- **Folder structure for API request.**
  - App
    - API
      - addSubscriber
        - route.ts (this is where we will fetch data)

- **route.ts convention for requests**
```
export async function POST(request: Request) {}
```

- Next we need to setup our MailChimp configuration with our API keys and API server from Mailchimp.  We will set up our environment variables in a few steps.
```
mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER,
});
```
Create a .env.local file, and copy/paste MAILCHIMP_API_KEY, MAILCHIMP_API_SERVER, MAILCHIMP_AUDIENCE_ID as your three variables.
To get the keys for each, go to the Mailchimp dashboard after you have created a free account, view your account, then extras, and click on "API Keys." Copy/Paste your API key into your .env.local file. The last bit of your API key that has "us-10" or something similar should be pasted into "MAILCHIMP_API_SERVER".  ***The convention should look like this:***
```
MAILCHIMP_API_KEY=Your API Key Here-us10
MAILCHIMP_API_SERVER=us10
MAILCHIMP_AUDIENCE_ID=4xmfk54f8f9
```
_To locate the audience id, go the mailchimp dashboard, go to "audience", and click "All contacts".  There should be a "settings" dropdown menu, and select "audience name and defaults".  On this page there should be a listed audience ID that is 10 characters long._

**View the GitHub Public repo for the full source code of the "NewsletterForm" signup page.**
- To call our route.ts from our form we will use the following code:
```
const res = await fetch("/api/addSubscriber", {
            body: JSON.stringify({ email }),
            headers: { "Content-Type": "application/json" },
            method: "POST",
          });
```
***The most important thing to take away from the block of code above is the "/api/addSubscriber". This is the path to our route.ts file, which is inside of the addSubscriber folder we created inside of the API folder. This allows for a direct fetch from the API.***
- In our route.ts file, we want to add the following block of code:
```
import mailchimp from "@mailchimp/mailchimp_marketing";


mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER,
});

export async function POST(request: Request) {
    const { email } = await request.json();

    if (!email) new Response(JSON.stringify({ error: "email is required" }));

    try {
        const response = await mailchimp.lists.addListMember(
            process.env.MAILCHIMP_AUDIENCE_ID!,
            { email_address: email, status: "subscribed" }
            );

        return new Response(JSON.stringify({ response }));

    } catch (error: any) {
        return new Response(JSON.stringify({ error: JSON.parse(error.response.text) })
        );
    }
}
```
To break down what we are doing above, please note that ***{ email }*** object is what we are sending to the MailChimp API. If we do not send an email ***{!email}*** we want to return an error message..
- In the try block, we want to have a response, and use the MailChimp API, to access our subscriber list, and add a list member.  
- Inside of the ***addListMember***, we will pass through our ***AUDIENCE_ID*** from our env file.  The second paramer we will be passing is the email address entered.

- Then we will stringify our JSON response we get back from the MailChimp API.
- If we have an error we will return a response that parses the error, and returns a the exact error in a text response format.

**Heading back to our NewsletterForm.tsx file, we need to take our JSON response to display in the front-end code. We are also adding success & error handling via useState. Please check out the source code for more details on integrating the API response to the front-end code.
```
  // POST request to /api/addSubscriber
        const res = await fetch("/api/addSubscriber", {
            body: JSON.stringify({ email }),
            headers: { "Content-Type": "application/json" },
            method: "POST",
          });

          const data = await res.json();

          if (data.error) {
            setErrorMessage('You are already subscribed!')
            setSuccessMessage(undefined);
            return;
          }

        setSuccessMessage(data.response);
        setErrorMessage('');
    };

    console.log(errorMessage)

    const dismissMessages = () => {
        setSuccessMessage(undefined);
        setErrorMessage('');
    };
```

### [Visit public Repository here](https://github.com/AshyLarryM/blog-app-next-demo)