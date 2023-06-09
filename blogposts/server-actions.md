---
title: 'Using Server Actions in Next.JS 13.4'	
date: '6/5-2023'
---
#### _Make a Full-Stack Next.JS Todo Application using Server Actions_
**What technologies are covered?**
- Next.Js 13.4 App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL Database
- Server Components, Client Components, & Server Actions
### [Create a todo list using Server Actions - GitHub Link with documenntation](https://github.com/AshyLarryM/server-actions-Next.js-13.4)
**Before we can understand Server Actions in Next.js, we must first understand what a Server component is, and its intended use cases.**
  ## What are server side components?
  By default, **ALL** components created in Next.js 13 are "server side." This means that components and their accompanying code are executed on the server in advance.  This reduces the bundle size for the client, and results in a faster initial load time for the user.  
  - **In traditional apps, the entire application is loaded in the browser, and the rendering process happens on the client-side using JavaScript.  In contrast, this can result in slower initial load times.  This is referred to as client side rendering**
  
### Server Side Rendering vs. Client Side Rendering
#### _Can I only choose 1?_
  No! There are use cases for Server Side Rendering ***and*** Client Side Rendering within a single application.  Here we will explore the use cases for each.

#### Server-Side Components
- Default Component type in Next.JS 13
- Fetching Data
- Accessing backend resources(directly)
- Keeping sensitive information on the server (access tokens, API Keys, etc...)
- Keep large dependencies on the server to reduce client side JavaScript bundle size.

#### Client-Side Components
- 'use client' at top of component to specify use of Client-Side Component.
- Adding interactivity and event listeners (onClick, onChange, etc...)
- State & Lifecycle Effects (useState, useReducer, useEffect, etc...)
- Browser APIs
- Custom hooks that are reliant on state.
- React Class Components.

## What if I want a mix of Server-Side and Client-Side rendering in a single component?
#### This is where **Server Actions** come into the equation.  With ***server actions***, you can add a function side of a Client-Side or Server Component.
- You no longer need write an individual API Routes when submitting a form or doing any other data mutations. 
- To specify a server action, you must first create an async function, and add 'use server' at the top of the function.  Here is an example.
```
import { cookies } from 'next/headers';
 
export default function AddToCart({ productId }) {
  async function addItem(data) {
    'use server';
 
    const cartId = cookies().get('cartId')?.value;
    await saveToDb({ cartId, data });
  }
 
  return (
    <form action={addItem}>
      <button type="submit">Add to Cart</button>
    </form>
  );
}
``` 
This code allows us to submit our form from the server instead of needing to use a client-side component.  We can also update the UI of our AddToCart by adding ***revalidatePath( )*** to refresh the page after the action runs, resulting in our Added Cart Item displaying in the UI automatically without a refresh needed.  
### If you'd like to try this out for yourself, visit my Github repository link below for an indepth view of executing server actions with a Todo List.  
**What technologies are covered?**
- Next.Js 13.4 App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL Database
- Server Components, Client Components, & Server Actions
  
### [Create a todo list using Server Actions - GitHub Link with docuemntation](https://github.com/AshyLarryM/server-actions-Next.js-13.4)

![App Screenshot](screenshots/emailSignup.png)
![App Screenshot](screenshots/emailSuccess.png)
![App Screenshot](screenshots/mailchimpAudience.png)
![App Screenshot](screenshots/emailFailure.png)