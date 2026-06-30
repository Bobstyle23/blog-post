---
description: Tech stack used to build pre-interview assignment
public: true
slug: tech-stack-cms
layout: ../../layouts/BlogPost.astro
title: What I used to build Cattle Management System
createdAt: 1782801189259
updatedAt: 1782803625401
tags: []
heroImage: /posts/tech-stack-cms_thumbnail.png
---


# Introduction

<br/>

I built a full-stack Cattle Management System using `Next.js 16`, `TypeScript`, `Prisma`, `React Query`, and `shadcn/ui`. The system allows farmers to create, view, update, and delete cattle records, provides simple but meaningful dashboard metrics, search functionality, and focuses on clean architecture, reusable components, and good UX

## Decisions on which tech stack to use

<br/>

Further below I will explain why did I use certain framework and library in this project 👇🏻

#### Why TypeScript instead of plain, good old friend JavaScript?

<br/>

Nowadays this choice is by default must programming language in any aspect of development

#### Why did I choose `Next.js` instead of `React`?

<br/>

I needed to handle both, backend and frontend for this project alongside with a database. Since `Next.js` supports both ends, it allowed me to build the entire system in one framework. `Next.js` provides built-in routing, `API` routes, server rendering, and a better project structure. Especially I love how `Next.js` handles routing with nested routes nowadays.

#### Why did I use the App router instead Pages router?

<br/>

The App router is the modern routing system in `Next.js`. It provides better and understandable layouts, nested routing (sometimes can get deeply nested though), server components, and aligns with the latest features

#### Why did I choose React Query?

<br/>

It simplified data fetching and cache management. Instead of manually updating React state after every API request, React Query automatically keeps the UI synchronized with the server

#### Why Prisma instead of raw SQL?

<br/>

Prisma provides type safety, auto-completion, migrations, and a much cleaner developer experience while still generating efficient SQL queries

#### Why SQLite? (in prisma set up)

<br/>

SQLite is lightweight and perfect for development or small projects because it doesn't require setting up a separate database server. For production, I would use PostgreSQL

#### Why Zod validation?

<br/>

Zod validates incoming data before it reaches the database. It ensures the data has the correct format and prevents invalid requests

## Application architecture

<br/>

I separated application into reasonable layers

```
UI Components

↓

Pages

↓

Service Layer

↓

API Routes

↓

Prisma

↓

Database
```

<br/>

Each layer has a single responsibility making the project easier to maintain

### Application work flow

<br/>

#### How does the create flow work?

<br/>

```
User fills the form

↓

Validation

↓

POST request

↓

API Route

↓

Prisma

↓

Database

↓

Success response

↓

React Query invalidates cache

↓

Table updates automatically
```

<br/>

#### How does the update flow work?

<br/>

The page fetches the existing cattle using its `id`, pre-fills the form, submits a `PUT` request after editing, updates the database through prisma, and refreshes the cached data using React Query

#### How does the delete flow work?

<br/>

The user clicks Delete confirms the action in an AlertDialog, a `DELETE` request is sent to the API, prisma removes the record, `React Query` invalidates the cache, and the table refreshes automatically
