export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Phynanx API',
      version: '1.0.0',
      description: 'API to perform searches against a records database',
    },
    servers: [
      {
        url: 'https://phynanx-backend.herokuapp.com/api/v1',
      },
    ],
  },
  apis: ['./src/api/v1/routes/*.ts', './src/api/v1/definitions.yaml'],
}
