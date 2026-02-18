import { test, expect } from "@playwright/test";

test.describe.only("JSON Placeholder Todos API", () => {
  test("Get request for todos", async ({ request }) => {
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

  // test("GET /todos/1 - returns todo with id 1", async ({ request }) => {
  //   const response = await request.get(
  //     "https://jsonplaceholder.typicode.com/todos?userId=1",
  //   );

  //   expect(response.status()).toBe(200);

  //   const todo = await response.json();

  //   expect(todo).toHaveProperty("userId", 1);
  //   expect(todo).toHaveProperty("id");
  //   expect(todo).toHaveProperty("title");
  //   expect(todo).toHaveProperty("completed");
  // });

  test("GET /todos/9999 - returns empty object", async ({ request }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/todos/9999",
    );
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body).toEqual({});
  });
});
