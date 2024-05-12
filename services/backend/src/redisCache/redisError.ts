export class RedisCacheError extends Error {
  constructor() {
    super();
    this.name = 'RedisCacheError';
  }
}
