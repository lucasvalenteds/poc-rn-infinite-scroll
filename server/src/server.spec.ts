import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { Server, Notification } from "./server";

const port = 8081;

const httpClient: AxiosInstance = Axios.create({
  baseURL: "http://localhost:" + port
});

beforeAll(() => Server.listen(port));

afterAll(() => Server.close());

test("It returns 10 notifications by default", async () => {
  const response: AxiosResponse<{
    notifications: Notification[];
  }> = await httpClient.get("/");

  expect(response.status).toStrictEqual(200);
  expect(response.headers["content-type"]).toStrictEqual("application/json");
  expect(response.data).toStrictEqual({
    notifications: expect.any(Array)
  });
});

test("It handles pagination via `offset` query parameter", async () => {
  const response: AxiosResponse<{
    notifications: Notification[];
  }> = await httpClient.get("/?offset=20");

  expect(response.status).toStrictEqual(200);
  expect(response.headers["content-type"]).toStrictEqual("application/json");
  expect(response.data).toStrictEqual({
    notifications: expect.any(Array)
  });
  expect(response.data.notifications[0].title.startsWith("20 - ")).toBeTruthy();
});
