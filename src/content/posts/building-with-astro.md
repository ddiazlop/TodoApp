---
title: "Building with Astro"
description: "Why Astro is my go-to framework for content-driven sites."
date: 2026-07-22
tags: ["astro", "webdev"]
draft: false
---

## Why Astro?

Astro is a framework designed for content-rich websites. Here's why I love it:

### Content Collections

Astro's content collections give you type-safe markdown handling with Zod validation. Define a schema for your frontmatter and get autocomplete and validation out of the box.

### Island Architecture

Only ship JavaScript for interactive components — everything else is static HTML. This means blazing fast pages by default.

### Framework Agnostic

Use Vue, React, Svelte, or Solid — or mix them all in the same project. Each component is an island, so they don't conflict.

```astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('posts');
---

<ul>
  {posts.map(post => <li>{post.data.title}</li>)}
</ul>
```

### The Future

With Astro 7, the framework keeps getting better. Better performance, improved dev experience, and tighter integration with the ecosystem.
