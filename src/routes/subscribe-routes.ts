import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const subscribeRoutes: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/subscripitions",
		{
			schema: {
				summary: "Subscribe someone to the event",
				tags: ["subscribe"],
				body: z.object({
					name: z.string(),
					email: z.string().email(),
				}),
				response: {
					201: z.object({
						name: z.string(),
						email: z.string().email(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { name, email } = request.body;
			return reply.status(201).send({ name, email });
		},
	);
};
