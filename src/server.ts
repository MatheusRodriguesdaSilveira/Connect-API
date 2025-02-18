import fastifyCors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./routes/env";
import { subscribeRoutes } from "./routes/subscribe-routes";

const app = fastify();

app.register(fastifyCors);

// app.register(fastifyCors, {
//   origin: "http://localhost:3000",
// });

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Fastify API",
			description: "Description",
			version: "0.1.0",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(subscribeRoutes);

app
	.listen({
		port: env.PORT,
	})
	.then(() => {
		console.log("HTTP server running on http://localhost:3333! 🚀");
	});
