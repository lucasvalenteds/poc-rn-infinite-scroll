import React from 'react';
import {FlatList} from 'react-native';
import ReactRenderer, {
    ReactTestRenderer,
    ReactTestInstance,
} from 'react-test-renderer';
import Axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import App, {Notification} from './App';

function createNotification(): Notification {
    return {
        id: "id-" + Math.random(),
        title: "Title",
        content: "Content",
    };
}

function createNotifications(amount: number): Notification[] {
    return Array(amount).fill(0).map(createNotification);
}

test('It renders items on first load', async () => {
    const server = new AxiosMockAdapter(Axios);
    server.onGet("http://localhost:8080/?offset=0").reply(200, {
        notifications: createNotifications(10),
    });
    const renderer: ReactTestRenderer = ReactRenderer.create(<App />);

    await ReactRenderer.act(async () => {});

    const node: ReactTestInstance = renderer.root.findByType(FlatList);

    expect(node.props.data).toHaveLength(10);
    expect(server.history.get).toHaveLength(1);
});
