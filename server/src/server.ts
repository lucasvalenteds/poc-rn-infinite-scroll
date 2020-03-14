import * as Http from "http";
import * as Url from "url";
import * as QueryString from "querystring";
import * as UUID from "uuid";
import Faker from "faker";

export interface Notification {
  id: string;
  title: string;
  content: string;
}

export const Server = Http.createServer((request, response) => {
  const url: QueryString.ParsedUrlQuery = Url.parse(request.url as string, true)
    .query;

  const { offset } = url;

  const notifications: Notification[] = Array(10)
    .fill(0)
    .map((_, index) => index + parseInt((offset as string) || "0", 10))
    .map(offset => ({
      id: UUID.v4(),
      title: `${offset} - ${Faker.lorem.words(3)}`,
      content: Faker.lorem.paragraph(1)
    }));

  response.setHeader("Content-Type", "application/json");
  response.statusCode = 200;
  response.write(JSON.stringify({ notifications }));
  response.end();
});
