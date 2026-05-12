---
description: >-
  A real-time social feed application built with React Native, Expo, MobX, React
  Query, and WebSockets featuring infinite scrolling, optimistic updates, live
  interactions, and scalable mobile architecture.
slug: mecenate-mobile-feed
public: true
layout: ../../layouts/BlogPost.astro
title: Mecenate React-Native Feed App
createdAt: 1778411928430
updatedAt: 1778595207635
tags:
  - Employer Project
heroImage: /posts/mecenate-mobile-feed_thumbnail.png
---


Mecenate Mobile Feed is a scalable React Native application focused on real-time social interactions and modern mobile application architecture. The project was built using Expo, TypeScript, MobX, React Query, and WebSockets while emphasizing performance, responsive mobile UX, and maintainable state management patterns.

## Screenshots

<br/>

![Simulator Screenshot - iPhone 17 Pro Max - 2026-05-10 at 18.06.21.png](/posts/mecenate-mobile-feed_simulator-screenshot-i-phone-17-pro-max-2026-05-10-at-18-06-21-png.png)
![Simulator Screenshot - iPhone 17 Pro Max - 2026-05-10 at 18.06.56.png](/posts/mecenate-mobile-feed_simulator-screenshot-i-phone-17-pro-max-2026-05-10-at-18-06-56-png.png)

## Features

<br/>

- Real-time WebSocket updates
- Infinite scrolling feed
- Optimistic likes and interactions
- Paid/free post system
- Comment synchronization
- Skeleton loading states
- Pull-to-refresh
- Query prefetching
- Cached detail pages
- Reusable UI components
- Mobile-first architecture

<br/>

## Tech Stack

<br/>

- React Native
- Expo
- TypeScript
- MobX
- TanStack Query
- Expo Router
- WebSockets
- Expo Blur
- React Native Reanimated

The application includes real-time feed updates, infinite scrolling, optimistic interactions, live comment synchronization, and a paid/free content system designed to simulate production-grade social media experiences.

A major focus of the project was combining server-state management with real-time WebSocket events while maintaining smooth mobile performance and predictable UI updates.

## Code Highlight

<br />

One of the key focuses of this project was synchronizing WebSocket events with React Query cache updates for instant UI feedback.

```ts
import { makeAutoObservable } from "mobx";
import { QueryClient } from "@tanstack/react-query";
import { authStore } from "./authStore";
import { Posts } from "@/entities/Posts";
import { Post } from "@/entities/Post";
import { Comments } from "@/entities/Comments";

export class SocketStore {
  ws?: WebSocket;

  constructor(private queryClient: QueryClient) {
    makeAutoObservable(this);
  }

  connect() {
    if (this.ws) return;

    this.ws = new WebSocket(
      `wss://k8s.mectest.ru/test-app/ws?token=${authStore.token}`
    );
    this.ws.onopen = () => {
      console.log("WS connected");
      this.queryClient.invalidateQueries({ queryKey: ["posts"] });
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleEvent(data);
      console.log("WS Event: ", event.data);
    };

    this.ws.onclose = () => {
      console.log("WS disconnected");
      this.ws = undefined;
    };

    this.ws.onerror = (error) => {
      console.log("WS error", error);
    };
  }

  disconnect() {
    this.ws?.close();
    this.ws = undefined;
  }

  handleEvent(data: any) {
    switch (data.type) {
      case "like_updated":
        this.onLikeUpdated(data);
        break;

      case "comment_added":
        this.onCommentAdded(data);
        break;
    }
  }

  onLikeUpdated(data: any) {
    const { postId, likesCount } = data;

    this.queryClient.setQueriesData(["posts", "all"], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: Posts) => ({
          ...page,
          posts: page.posts.map((post: Post) =>
            post.id === postId ? { ...post, likesCount } : post
          ),
        })),
      };
    });

    this.queryClient.setQueryData(["post", postId], (oldPost: Post | any) => {
      if (!oldPost) return oldPost;

      return {
        ...oldPost,
        likesCount,
      };
    });
  }

  onCommentAdded(data: any) {
    const { postId, comment } = data;

    this.queryClient.setQueryData(["comments", postId], (oldData: any) => {
      if (!oldData) return oldData;

      const exists = oldData.pages.some((page: Comments) =>
        page.comments.some((c) => c.id === comment.id)
      );

      if (exists) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: Comments, index: number) =>
          index === 0
            ? { ...page, comments: [comment, ...page.comments] }
            : page
        ),
      };
    });

    this.queryClient.setQueryData(["post", postId], (oldData: any) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        commentsCount: oldData.commentsCount + 1,
      };
    });

    this.queryClient.setQueriesData({ queryKey: ["posts"] }, (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: Posts) => ({
          ...page,
          posts: page.posts.map((post: Post) =>
            post.id === postId
              ? {
                  ...post,
                  commentsCount: post.commentsCount + 1,
                }
              : post
          ),
        })),
      };
    });
  }
}
```

[Github Repo](https://github.com/Bobstyle23/feeds)
