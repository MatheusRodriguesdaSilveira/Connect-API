import fastifyCors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link'
import { getRankingRoute } from './routes/get-ranking'
import { getSubscriberInvitesClicksRoute } from './routes/get-subscriber-invite-clicks'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position'
import { subscribeRoute } from './routes/subscribe-to-event'

try {
  const app = fastify()

  app.register(fastifyCors)

  // app.register(fastifyCors, {
  //   origin: "http://localhost:3000",
  // });

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Fastify API',
        description: 'Description',
        version: '0.1.0',
      },
    },
    transform: jsonSchemaTransform,
  })

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  // Routes
  app.register(accessInviteLinkRoute)
  app.register(getRankingRoute)
  app.register(getSubscriberInvitesClicksRoute)
  app.register(getSubscriberInvitesCountRoute)
  app.register(getSubscriberRankingPositionRoute)
  app.register(subscribeRoute)

  // Server
  const port = env.PORT || 3333
  app
    .listen({
      port,
    })
    .then(() => {
      console.log(
        `HTTP server running on http://localhost:${process.env.PORT || 3333}! 🚀`
      )
    })
} catch (error) {
  console.error(error)
}
