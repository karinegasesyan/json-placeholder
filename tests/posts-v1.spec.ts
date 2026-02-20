import { test, expect } from "@playwright/test";
import { request } from "node:http";
import { title } from "node:process";

const postId: number = 1;
const newPost = {
  userId: 1,
  title: "What is Lorem Ipsum?",
  body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
};
const updatedData = {
  userId: 1,
  title: "loarem ipsum",
  body: "solo ipsum",
};

const patchData = {
  title: "What a wonderful world!",
};

test.describe("JSON Placeholder API posts test", () => {
  test("POST create a new Post", async ({ request }) => {
    const response = await request.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        data: newPost,
      },
    );

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const data = await response.json();

    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("userId", newPost.userId);
    expect(data).toHaveProperty("title", newPost.title);
    expect(data).toHaveProperty("body", newPost.body);
  });

  test(`Get request for posts`, async ({ request }) => {
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

  test(`Get request for post id ${postId}`, async ({ request }) => {
    const response = await request.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post).toHaveProperty("userId");
    expect(post).toHaveProperty("id", postId);
    expect(post).toHaveProperty("title");
    expect(post).toHaveProperty("body");
  });

  test(`Get request comments for post id ${postId} - with path params`, async ({
    request,
  }) => {
    const response = await request.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const comments = await response.json();

    for (let comment of comments) {
      expect(comment).toHaveProperty("postId", postId);
      expect(comment).toHaveProperty("id");
      expect(comment).toHaveProperty("name");
      expect(comment).toHaveProperty("email");
      expect(comment).toHaveProperty("body");
    }
  });

  test(`Get request comments for post id ${postId} - with query params`, async ({
    request,
  }) => {
    const response = await request.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
    );

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const comments = await response.json();

    for (let comment of comments) {
      expect(comment).toHaveProperty("postId", postId);
      expect(comment).toHaveProperty("id");
      expect(comment).toHaveProperty("name");
      expect(comment).toHaveProperty("email");
      expect(comment).toHaveProperty("body");
    }
  });

  test(`PUT update update postID ${postId}`, async ({ request }) => {
    const response = await request.put(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      { data: updatedData },
    );
    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty("userId", updatedData.userId);
    expect(data).toHaveProperty("id", postId);
    expect(data).toHaveProperty("body", updatedData.body);
    expect(data).toHaveProperty("title", updatedData.title);
  });

  test(`PATCH partial update postId ${postId}`, async ({ request }) => {
    const response = await request.patch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        data: patchData,
      },
    );
    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data).toHaveProperty("id", postId);
    expect(data).toHaveProperty("title", patchData.title);
  });

  test.only(`Delete post postId ${postId}`, async ({ request }) => {
    const response = await request.delete(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );
    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toEqual({});
  });
});
