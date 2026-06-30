---
description: Cattle Management System
slug: cattle-mng-system
public: true
layout: ../../layouts/BlogPost.astro
title: How I developed & designed Pre-Test assignment
createdAt: 1781940457857
updatedAt: 1782796652068
tags: []
heroImage: /posts/cattle-mng-system_thumbnail.png
---


# Development Phases

<br/>
I built this project as a full-stack cattle management application to practice and demonstrate modern web development using Next.js, TypeScript, Prisma, React Query, and shadcn/ui. My goal wasn't just to finish a CRUD application, but to build it in a way that reflects how a real production application would be structured.
<br/>
<br/>

Instead of jumping straight into coding, I first spent some time planning the overall architecture. I wanted to keep the frontend, backend, and database responsibilities separated so the project would be easier to maintain and extend later. I decided to structure the application into reusable UI components, a service layer for API communication, API routes for business logic, and Prisma for database access.

## Project Setup

<br/>

I started by creating a Next.js 16 project using the App Router. After setting up TypeScript and Tailwind CSS, I installed shadcn/ui because I wanted a clean and consistent UI without spending too much time designing components from scratch.

I then installed Prisma and configured SQLite for development. After creating the Prisma schema, I generated the Prisma client and seeded the database with sample cattle records so I could immediately start building features.

## Database Design

<br/>

The first thing I designed was the database model. I created a `Cattle` model with the following fields:

```ts
id;
tagNumber;
breed;
gender;
dateOfBirth;
status;
createdAt;
updatedAt;
```

<br/>
<br/>

I used Prisma's `cuid()` for the primary key, made the tag number unique, and used type and interfaces for gender and status to prevent invalid values from being stored

Thinking about and setting up the database first made the rest of the development process much easier because every feature depended on having a solid data model

## Building the Backend

<br/>

Once the database was ready I started creating the REST APIs

I implemented endpoints for:

- Getting all cattle

- Getting a single cattle by ID

- Creating cattle

- Updating cattle

- Deleting cattle

I also added Zod validation so that incoming requests are validated before reaching the database. This helped prevent invalid data from being saved and made the API responses much more predictable

## Creating a Service Layer

<br/>

Instead of calling `fetch()` directly inside React components, I created a separate service layer.

Functions like:

- `getCattle()`

- `getCattleById(id)`

- `createCattle(data)`

- `updateCattle(id)`

- `deleteCattle(id)`

This kept my components much cleaner because they only needed to call functions instead of worrying about request URLs or fetch configuration

## Managing Server State

<br/>

For server state management I decided to use TanStack React Query

Instead of manually storing API responses in React state I used `useQuery()` for fetching data and `useMutation()` for create, update, and delete operations

After every successful mutation I invalidated the related queries by queryKey so the UI automatically refreshed with the latest data without manually refetching everything

Using React Query simplified a lot of state management and caching that would otherwise require additional code

## Building the UI

<br/>

I tried to avoid creating large components that handled too many responsibilities

Instead I built reusable components such as:

- CattleForm

- CattleTable

- StatCard

- StatusBadge

- DeleteCattleDialog

- RecentCattleTable

This made the application much easier to maintain because each component only focuses on one responsibility

## Dashboard

<br/>

After finishing CRUD operations I added a dashboard to give users a quick overview of all cattle

The dashboard currently displays:

- Total cattle

- Healthy cattle

- Sick cattle

- Pregnant cattle

- Sold cattle

- Deceased cattle

I also added a "Recently Added" section that displays the five most recently registered cattle just in case of additional info

Instead of making several API requests for each statistic I created a dedicated dashboard endpoint that aggregates everything into a single response.

Actually I calculated all statuses' count by using `filter()` at first and then ended up creating an endpoint for them

This reduced unnecessary requests and simplified the frontend

## Search Functionality

<br/>

To make the cattle table easier to use I implemented client-side searching

Users can search by:

```
- tagNumber
- breed
```

<br/>

The table updates instantly as the user types, making it much easier to locate records

## Improving User Experience

<br />

After the main functionality was complete I spent some time improving the overall user experience

### Status Badges

<br />

Instead of displaying plain text for cattle status I created a reusable `StatusBadge` component that visually distinguishes statuses such as Healthy, Sick, Pregnant, Deceased and Sold

This small change significantly improved readability

### Delete Confirmation

<br />

Originally clicking the delete button immediately removed a cattle record

I replaced this with a confirmation dialog using shadcn's AlertDialog component so users have a chance to cancel accidental deletions

### Toast Notifications

<br />

I added toast notifications for successful and failed operations

Now users receive immediate feedback after creating, updating, or deleting a record instead of wondering whether the action completed successfully

## Debugging Challenges

<br/>

One of the most valuable parts of this project was debugging

I encountered several issues that required me to carefully trace data through different layers of the application instead of guessing

Instead of immediately changing code I started debugging each layer individually

I checked:

- The page route parameters

- React Query mutations

- Service layer requests

- API request URLs

- API route handlers

- Prisma queries

This helped me narrow the issue down and eventually identify where the route parameters were not being handled correctly.

Working through these problems taught me the importance of debugging systematically instead of making random changes and hoping the issue disappears

One issue happened while working with Next.js App Router

I initially used routing patterns that were different from the App Router implementation which resulted in navigation errors. After reviewing the documentation I updated the routing logic to match the correct App Router approach

```tsx:
import { useRouter } from "next/router";

const router = useRouter();

router.push("/cattle");
```

<br/>

Code above throw me an error because as I've figured out that `next/router` only works with Pages router

```
NextRouter was not mounted
```

<br/>

```tsx
import { useRouter } from "next/navigation"; // changed to 'next/navigation'

const router = useRouter();

router.push("/cattle");
```

<br/>

Another challenge was updating and deleting cattle records

At one point, Prisma reported that the `where` clause required an ID even though I believed I was passing one

When updating a cattle record Prisma threw an error similar to

```ts
Argument `where` of type CattleWhereUniqueInput needs at least one of `id` or `tagNumber` arguments.
```

<br/>

My first thought was "But Im already passing the `id`"

My update query was like this

```tsx
const cattle = await prisma.cattle.update({
  where: {
    id,
  },
  data: {
    tagNumber: body.tagNumber,
    breed: body.breed,
    gender: body.gender,
    dateOfBirth: new Date(body.dateOfBirth),
    status: body.status,
  },
});
```

<br/>

I was sure that my code had nothing wrong

<br/>

I assumed prisma was the problem because the error mentioned the `where` clause. Also i had encountered a lot problems with prisma in my previous projects so naturally i was blaming prisma, lol

However instead of changing the prisma query immediately I decided to verify whether the `id` was actually reaching prisma

First I verified that the `id` was being retrieved from the rout

```tsx
const { id } = useParams();

console.log(id);
```

<br/>

And the browser printed the actual unique `id` of the cattle

```
cmqyxr4b40000hzmv9ugyfk68
```

<br/>

So the page was receiving the correct route parameter

Next I confirmed that the service function was constructing the correct API request

```tsx
export async function updateCattle(id: string, data: CattleFormValues) {
  return fetch(`/api/cattle/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
```

<br/>

I also checked the browser's network tab and verified that the request url looked good

```
PUT / api / cattle / cmqyxr4b40000hzmv9ugyfk68
```

<br/>

This confirmed the `id` was leaving the frontend correctly

Then i added a log inside the API route before calling prisma

```tsx
export async function PUT(request: Request, { params }: CattleParam) {
  const { id } = await params;

  console.log(id);
}
```

<br/>

This helped me verify whether the dynamic route parameter was reaching the backend

Only after confiming that the `id` was available in the API route, i did look at the prisma query itself

```tsx
await prisma.cattle.update({
  where: {
    id,
  },
  data: {
    ...
  },
});
```

<br/>

Since the query itself was correct, i knew the issue had to be somewhere before prisma rather than inside prisma

### The root cause

<br/>

The issue turned out not to be prisma at all

It was related to how the dynamic route parameter was being handled in the app router. Once i corrected the route parameter handling and confirmed that the `id` was properly passed into the API route both the update and delete operations started working as expected

Originally wrote my API route like this:

```tsx
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const cattle = await prisma.cattle.update({
    where: {
      id: params.id,
    },
    data: body,
  });

  return NextResponse.json(cattle);
}

export async function DELETE({ params }: { params: { id: string } }) {
  await prisma.cattle.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    message: "Deleted",
  });
}
```

<br/>

Prisma threw

```
Argument `where` of type CattleWhereUniqueInput needs at least one of `id` or `tagNumber`.
```

<br/>

After checking the NextJS app router documentation i updated the handlers

```tsx
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const cattle = await prisma.cattle.update({
    where: {
      id,
    },
    data: {
      tagNumber: body.tagNumber,
      breed: body.breed,
      gender: body.gender,
      dateOfBirth: new Date(body.dateOfBirth),
      status: body.status,
    },
  });

  return NextResponse.json(cattle);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.cattle.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "Deleted",
  });
}
```

<br/>

In NextJs 16 app router route handler `params` are async

I originally treated them like sync objects

But the correct approach was:

```tsx
const { id } = await params;
```

<br/>

### Choosing the correct HTTP method

<br/>

Another issue, i would call this as a concern not an issue

I considered whether the update endpoint should use `PUT` or `PATCH`

Since my form always edits every field of a cattle record `PUT` was appropriate because it represents replacing the resource with a complete updated version

If i decide that the system should support quick actions like "mark as sold" or "change status" i would introduce a `PATCH` endpoint because only single field changes

At first i used `PUT` because it was simpler to implement

```ts
PUT /api/cattle/:id
```

<br/>

It expected the entire cattle object to be sent

```tsx
{
  "tagNumber": "COW-001",
  "breed": "Angus",
  "gender": "MALE",
  "dateOfBirth": "2022-01-01",
  "status": "HEALTHY"
}
```

<br/>

I realized this meant that if the frontend only wanted to update the status it still had to send every other field

This wasn't the bug or issue, but it was not ideal

I noted that a better design for production would be to switch to `PATCH` that accepts only fields being modified

But

Switching to `PATCH` would cause validation error in my current validation schema because i was validating the full body

```ts
const result = cattleSchema.safeParse(body);
```

<br/>

Since `cattleSchema` requires every property to be sent, a request like below would fail validation

```ts
{
  "status": "SOLD"
}
```

<br/>

And the fix would be to change the validation also

```ts
const patchSchema = cattleSchema.partial();
```

<br/>

I have tested by using `PATCH` like this

```tsx
data: {
  tagNumber: body.tagNumber,
  breed: body.breed,
  gender: body.gender,
  dateOfBirth: body.dateOfBirth,
  status: body.status,
}
```

<br/>

If the request body was only like this

```ts
{
  "status": "SOLD"
}
```

<br/>

then everything else becomes `undefined` which overwrites existing values and cause a validation errors

So i decided to go with `PUT` for now

<br/>

## What I Learned

<br/>

This project strengthened my understanding of

- Next.js App Router

- TypeScript

- Prisma ORM

- Database modeling

- REST API design

- React Query

- Zod validation

- Component architecture

- State management

- Debugging techniques

- Building reusable UI components

More importantly it helped me understand how all parts of a full-stack application work together instead of treating the frontend and backend as separate pieces

## If I Continued This Project

<br/>

There are several features I would like to add if I continued developing this application

- User authentication and authorization

- Role-based access control (super admin, admin, user)

- Pagination

- Medical and vaccination records

- Weight history tracking

- Image uploads
