---
description: Read this file to learn how to fetch data from an API and display it in your application.
---
# Data Fetching Instructions
To fetch data from an API, you can use the `fetch` function in JavaScript. Here is a step-by-step guide on how to do this:
## 1. Use server components for data fetching
In Next.js, ALWAYS use server components for data fetching. NEVER use client components for data fetching. 

## 2. Data fetching methods
ALWAYS use the helper functions in the /data directory for data fetching. NEVER use the fetch function directly in your components.

ALL helper functions in the /data directory should use drizzle ORM for database interactions. 