import type { IncomingMessage } from 'node:http';
import { parseCookies } from '../utils/parse-cookies.ts';

export interface CustomRequest extends IncomingMessage {
  query: URLSearchParams;
  pathname: string;
  body: Record<string, unknown>;
  params: Record<string, string>;
  cookies: Record<string, string | undefined>;
  ip: string;
  baseurl: string;
}

export async function customRequest(request: IncomingMessage) {
  const req = request as CustomRequest;
  const url = new URL(req.url || '', 'http://localhost');
  req.query = url.searchParams;
  req.pathname = url.pathname;
  req.params = {};
  req.body = {};
  req.cookies = parseCookies(req.headers.cookie);
  req.ip = req.socket.remoteAddress || '127.0.0.1';
  req.baseurl = 'http://localhost:3000';

  return req;
}
