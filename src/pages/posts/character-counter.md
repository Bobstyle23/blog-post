---
description: >-
  An interactive character counter application built with vanilla JavaScript,
  HTML, SCSS, and Gulp featuring real-time text analytics, responsive layouts,
  and modern frontend workflow tooling.
slug: character-counter
public: true
layout: ../../layouts/BlogPost.astro
title: Character Counter
createdAt: 1778511947196
updatedAt: 1778569758296
tags:
  - Personal Project
heroImage: /posts/character-counter_thumbnail.jpg
---

Character Counter is a lightweight and responsive text analysis application focused on real-time input processing and modern frontend development practices using vanilla JavaScript. Built with HTML, SCSS, and Gulp, the project emphasizes clean UI implementation, reusable styling architecture, and optimized frontend workflow tooling.

The application provides live character and word counting, sentence analysis, and instant text feedback while maintaining a polished user experience across desktop and mobile devices.

## Screenshots

<br/>

![Screenshot 2026-05-12 at 11.50.42.png](/posts/character-counter_screenshot-2026-05-12-at-11-50-42-png.png)
![Screenshot 2026-05-12 at 11.51.20.png](/posts/character-counter_screenshot-2026-05-12-at-11-51-20-png.png)
![Screenshot 2026-05-12 at 11.55.15.png](/posts/character-counter_screenshot-2026-05-12-at-11-55-15-png.png)
![Screenshot 2026-05-12 at 11.55.33.png](/posts/character-counter_screenshot-2026-05-12-at-11-55-33-png.png)
![Screenshot 2026-05-12 at 11.55.46.png](/posts/character-counter_screenshot-2026-05-12-at-11-55-46-png.png)
![Screenshot 2026-05-12 at 11.55.52.png](/posts/character-counter_screenshot-2026-05-12-at-11-55-52-png.png)
![Screenshot 2026-05-12 at 11.56.38.png](/posts/character-counter_screenshot-2026-05-12-at-11-56-38-png.png)
![Screenshot 2026-05-12 at 11.57.59.png](/posts/character-counter_screenshot-2026-05-12-at-11-57-59-png.png)
![Screenshot 2026-05-12 at 11.58.11.png](/posts/character-counter_screenshot-2026-05-12-at-11-58-11-png.png)

## Features

<br/>

- Real-time character counting
- Word and sentence analytics
- Instant text updates
- Responsive layouts
- Modern typography and spacing
- SCSS architecture
- Reusable styling patterns
- Optimized frontend workflow
- Lightweight and fast performance

<br/>

## Tech Stack

<br/>

- HTML5
- JavaScript (ES6+)
- SCSS / Sass
- Gulp
- CSS3
- GitHub Pages

<br/>

The project focuses on responsive frontend implementation, reusable SCSS structure, and efficient DOM interaction patterns while showcasing modern vanilla JavaScript development practices. Special attention was given to clean styling architecture, maintainable folder organization, and optimized asset compilation using Gulp workflows.

Key highlights include modular SCSS organization, responsive UI implementation, real-time text processing, and streamlined frontend tooling for scalable styling and development efficiency.

## Code Highlight

<br />

```js

static {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      document.documentElement.dataset.theme = "dark";
    } else {
      document.documentElement.dataset.theme = "light";
    }

    window
      .matchMedia("(prefers-color-scheme:dark)")
      .addEventListener("change", (event) => {
        document.documentElement.dataset.theme = event.matches
          ? "dark"
          : "light";
      });
  }

  static #countLetter(str, letter) {
    return str.split("").reduce((acc, curr) => {
      if (curr.toLowerCase() === letter) {
        acc++;
      }
      return acc;
    }, 0);
  }

  static #countReadingTime(words, instance) {
    return words.length / _AVG_READING_TIME.get(instance);
  }

  static #switchMode() {
    if (document.documentElement.dataset.theme === "light") {
      document.documentElement.dataset.theme = "dark";
      return;
    }
    document.documentElement.dataset.theme = "light";
  }

```

<br />

[Live Demo](https://bobstyle23.github.io/character-counter/)

[GitHub Repo](https://github.com/Bobstyle23/character-counter)
