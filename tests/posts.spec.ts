import { test, expect } from "@playwright/test";
import { request } from "node:http";

test.describe("JSON Placeholder API posts test", () => {
  test("Get request for posts", async ({ request }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/posts",
    );

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const posts = await response.json();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.length).toBe(100);

    for (let post of posts) {
      expect(post).toHaveProperty("userId");
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("body");
    }
  });

  test("Get request for post id 1", async ({ request }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/posts/1",
    );

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post).toHaveProperty("userId");
    expect(post).toHaveProperty("id", 1);
    expect(post).toHaveProperty("title");
    expect(post).toHaveProperty("body");
  });

  test("Get request comments for post id 1 - with path params", async ({
    request,
  }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/posts/1/comments",
    );

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const comments = await response.json();

    for (let comment of comments) {
      expect(comment).toHaveProperty("postId", 1);
      expect(comment).toHaveProperty("id");
      expect(comment).toHaveProperty("name");
      expect(comment).toHaveProperty("email");
      expect(comment).toHaveProperty("body");
    }
  });

  test("Get request comments for post id 1 - with query params", async ({
    request,
  }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/comments?postId=1",
    );

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const comments = await response.json();

    for (let comment of comments) {
      expect(comment).toHaveProperty("postId", 1);
      expect(comment).toHaveProperty("id");
      expect(comment).toHaveProperty("name");
      expect(comment).toHaveProperty("email");
      expect(comment).toHaveProperty("body");
    }
  });
});
