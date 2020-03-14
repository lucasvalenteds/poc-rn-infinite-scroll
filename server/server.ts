import * as Http from 'http';
import * as Url from 'url';
import * as QueryString from 'querystring';
import * as UUID from 'uuid';
import Faker from 'faker';

export interface Notification {
    id: string;
    title: string;
    content: string;
}

export const Server = Http.createServer((request, response) => {
    const url: QueryString.ParsedUrlQuery = Url.parse(request.url || '', true).query;

    const notifications: Notification[] = Array(10).fill(0)
    .map((_, index) => index + parseInt(url.offset.toString(), 10))
    .map(() => ({
        id: UUID.v4(),
        title: Faker.lorem.words(3),
        content: Faker.lorem.paragraph(1),
    }));

    response.setHeader("Content-Type", "application/json");
    response.statusCode = 200;
    response.end(JSON.stringify({ notifications }));
});
