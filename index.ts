import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, {
	json,
	urlencoded,
	type NextFunction,
	type Request,
	type Response,
} from "express";
import morgan from "morgan";

const init = async () => {
	// Config
	 const app = express();
	const PORT = 8000;

	// Middleware
	app.use(cors({}));
	app.use(json({}));
	app.use(urlencoded({ extended: true }));
	app.use(morgan("dev"));

	// GraphQL server

	const gqlServer = new ApolloServer({
		// Schema
		typeDefs: `

    type Query {
        gqlHealthStatus: String!
        say(name:String): String
        }
            `,

		resolvers: {
			Query: {
				gqlHealthStatus: () => `graphQL is healthy.`,
				say: (_, { name }: { name: string }) => `Hey ${name}, How are you?`,
			},
		},
	});

	try {
		// start gql server
		await gqlServer.start();
	} catch (error) {
		console.log("Error in gql server start:", error);
	}

	// Routes
	app.get("/health", (req: Request, res: Response, next: NextFunction) => {
		res.status(200).json({ msg: "Healthy" });
	});

	app.use("/graphql", expressMiddleware(gqlServer));

	app.listen(PORT, async () => {
		console.log(`server running on port : ${PORT}`);
	});
};

init();
