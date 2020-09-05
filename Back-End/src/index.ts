import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { IWebhookRequest } from "./models/webhookRequest";
import {
  performIdentityCheckWithId,
  performIdentityCheckWithUsername,
} from "./controller/identityCheck";
import bodyParser from "body-parser";
import { customers } from "./customers";
import exphbs from "express-handlebars";

//env variables
dotenv.config();
const PORT = process.env.SERVER_PORT;

//setup express app
const app = express();
app.engine("handlebars", exphbs());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("json spaces", 2);
app.use(cors());

//start listening
app.listen(PORT, () => {
  // tslint:disable-next-line
  console.log("Express server listening on port " + PORT);
});

//status codes [ 200, 400 ]
app.post("/", async (req, res) => {
  const result = req.body as IWebhookRequest;
  if (!result) {
    res.statusCode = 400;
    return res.send("invalid parameters");
  }
  const { parameters, outputContexts } = result.queryResult;
  switch (parameters["action"]) {
    case "identity-check":
      const customerId = parameters["customer-id"] as number;
      try {
        //check for customer with id
        let customer = await performIdentityCheckWithId(customerId);
        //found customer
        if (customer !== null) return res.send(customer);

        //check for output contexts if we have identity-check-intent
        if (!outputContexts.length) throw Error("no customer found");
        const outputContext = outputContexts.find(
          (context) => context.name === "identity-check-intent"
        );

        //check if username exists in output context
        if (!outputContext.parameters["username"])
          throw Error("no customer found");

        //find customer with username
        customer = await performIdentityCheckWithUsername(outputContext
          .parameters["username"] as string);

        //return found customer otherwise throw error if no customer was found
        if (customer !== null) return res.send(customer);
        throw Error("customer not found");
      } catch (e) {
        //return with 400 status
        res.statusCode = 400;
        return res.send("invalid parameters");
      }
    case "complain":
      break;
    default:
      break;
  }
});

app.get("/", (req, res) => {
  return res.send(customers);
});
