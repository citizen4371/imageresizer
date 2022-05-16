import http from 'node:http';
import https from 'node:https';

export function chooseClientForURL(url) {
    const protocol = new URL(url).protocol;

    if (protocol === 'http:') {
        return http;
    } else if (protocol === 'https:') {
        return https;
    }

    return null;
}