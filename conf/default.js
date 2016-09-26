export const config = {
  api: {
    port: 4000
  },
  log: {
    id: 'client',
    http: {
      name: 'gui-http',
      events: ['error']
    },
    router: {
      name: 'gui-router',
      events: ['error']
    },
    ws: {
      name: 'gui-ws',
      events: ['error']
    }
  }
};
