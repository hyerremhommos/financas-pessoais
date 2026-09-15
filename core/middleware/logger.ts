import type { Middleware } from '../router.ts';

// Middleware Local
export const logger: Middleware = (req, res) => {
  console.log(`${req.method} ${req.pathname}`);
};