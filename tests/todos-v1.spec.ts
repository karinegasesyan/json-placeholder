import { test, expect } from "@playwright/test";

const todoId: number = 1;
const newPost = {
  userId: 1,
  title: "Lorem ipsum",
  completed: false,
};
const updatedData = {
  userId: 1,
  title: "Earth song",
  completed: true,
};
const patchData = {
  userId: 1,
  title: "Earth song",
  completed: false,
};

test.describe("JSON Placeholder Todos API", () => {
  test("POST request for todos", async ({ request }) => {
    const response = await request.post(
      "https://jsonplaceholder.typicode.com/todos",
      { data: newPost },
    );
    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(201);

    const data = await response.json();
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("userId", newPost.userId);
    expect(data).toHaveProperty("title", newPost.title);
    expect(data).toHaveProperty("completed", newPost.completed);
  });

  test("GET request for todos", async ({ request }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/todos",
    );
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const todos = await response.json();
    expect(todos.length).toBeGreaterThan(0);

    for (let todo of todos) {
      expect(todo).toHaveProperty("userId");
      expect(todo).toHaveProperty("id");
      expect(todo).toHaveProperty("title");
      expect(todo).toHaveProperty("completed");
    }
  });

  test(`GET request for todo with id ${todoId}`, async ({ request }) => {
    const response = await request.get(
      `https://jsonplaceholder.typicode.com/todos?userId=${todoId}`,
    );

    expect(response.status()).toBe(200);

    const todos = await response.json();
    for (let todo of todos) {
      expect(todo).toHaveProperty("userId", todoId);
      expect(todo).toHaveProperty("id");
      expect(todo).toHaveProperty("title");
      expect(todo).toHaveProperty("completed");
    }
  });

  test("GET /todos/9999 - returns empty object", async ({ request }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/todos/9999",
    );
    expect(response.ok()).toBe(false);
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body).toEqual({});
  });

  test(`PUT date todos ${todoId}`, async ({ request }) => {
    const response = await request.put(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      { data: updatedData },
    );
    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty("userId", updatedData.userId);
    expect(data).toHaveProperty("id", todoId);
    expect(data).toHaveProperty("title", updatedData.title);
    expect(data).toHaveProperty("completed", updatedData.completed);
  });

  test(`PATCH date todos ${todoId}`, async ({ request }) => {
    const response = await request.patch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      { data: patchData },
    );
    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty("id", todoId);
    expect(data).toHaveProperty("completed", patchData.completed);
  });

  test(`Delete todos todoId ${todoId}`, async ({ request }) => {
    const response = await request.delete(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    );
    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toEqual({});
  });
});
