---
description: >-
  A modern game discovery platform built with React, TypeScript, and RAWG API
  integration. Browse trending titles, explore genres and platforms, search
  games instantly, and enjoy a sleek responsive experience with dynamic
  filtering and sorting.
slug: game-hub
public: true
layout: ../../layouts/BlogPost.astro
title: GameHub
createdAt: 1778406107592
updatedAt: 1778411662685
tags: []
heroImage: /posts/game-hub_thumbnail.png
---


GameHub is a modern video game discovery platform inspired by real-world gaming marketplaces and browsing experiences. Built with React, TypeScript, and Vite, the application integrates with the RAWG API to deliver rich game data, advanced filtering, responsive layouts, and a smooth user experience across desktop and mobile devices.

## Screenshots

<br/>

![Screenshot 2026-05-10 at 15.47.36.png](/posts/game-hub_screenshot-2026-05-10-at-15-47-36-png.png)

![Screenshot 2026-05-10 at 15.48.09.png](/posts/game-hub_screenshot-2026-05-10-at-15-48-09-png.png)
![Screenshot 2026-05-10 at 15.48.27.png](/posts/game-hub_screenshot-2026-05-10-at-15-48-27-png.png)
![Screenshot 2026-05-10 at 15.48.45.png](/posts/game-hub_screenshot-2026-05-10-at-15-48-45-png.png)
![Screenshot 2026-05-10 at 15.48.58.png](/posts/game-hub_screenshot-2026-05-10-at-15-48-58-png.png)

## Features

<br/>

- Real-time game search
- Genre filtering
- Platform selection
- Dynamic sorting
- Responsive layouts
- Dark mode support
- Reusable UI architecture
- Optimized API requests

<br/>

## Tech Stack

<br/>

- React
- TypeScript
- Vite
- Chakra UI
- Axios
- RAWG API
- React Query
- Vercel

<br/>

The project focuses on scalable frontend architecture, reusable UI components, and efficient data-fetching patterns while showcasing modern React development practices. Users can search games in real time, filter by genres and platforms, sort results dynamically, and explore detailed game information through an intuitive and visually polished interface.

Key highlights include responsive grid layouts, optimized API integration, reusable component patterns, dark mode support, and clean TypeScript-driven code organization designed for maintainability and scalability.

## Code Highlight

<br/>

One of the focuses of this project was creating reusable and scalable data-fetching patterns using React Query and TypeScript.

```ts

export const useGames = (
  selectedGenre?: Genre,
  selectedPlatform?: Platform,
  sortOrder?: string,
  searchText?: string
) =>
  useInfiniteQuery<GameResponse>({
    queryKey: [
      "games",
      selectedGenre?.id,
      selectedPlatform?.id,
      sortOrder,
      searchText,
    ],

    queryFn: ({ pageParam = 1 }) =>
      apiClient
        .get("/games", {
          params: {
            genres: selectedGenre?.id,
            parent_platforms: selectedPlatform?.id,
            ordering: sortOrder,
            search: searchText,
            page: pageParam,
          },
        })
        .then((res) => res.data),

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },

    staleTime: 1000 * 60 * 5,
  });

```

<br/>

### Project Structure

```bash

src/
 ├── assets/
 ├── components/
 ├── data/
 ├── entities/
 ├── hooks/
 ├── pages/
 ├── services/
 └── stores/
 
```

<br/>

[Live Demo](https://game-hub-react-tawny.vercel.app/)<br/>
[GitHub Repository](https://github.com/Bobstyle23/gamehub)
