import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import * as jwt from "jsonwebtoken";
import schema from "./graphql/schemasMap";
import User from "./api/user/user.model";
import "./lib/mongoose";
import * as dotenv from "dotenv";
import * as cors from 'cors';

const PORT = 4000;

const app = express();
app.use(cors())
dotenv.config();
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    let user;

    if (token) {
      const decode: any = await jwt.verify(token, process.env.TOKEN_KEY!);
      user = await User.findOne({ _id: decode._id }).lean();

      if (!user) {
        throw new Error("UnAuthorized");
      }
    }
    
    return { user };
  },
});
server.applyMiddleware({ app, path: "/graphql" });
app.listen(PORT, () => {
  console.log(
    `\n🚀      GraphQL is now running on http://localhost:${PORT}/graphql`
  );
});