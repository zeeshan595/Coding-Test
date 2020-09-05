import fetch from "node-fetch";
import { ICustomer } from "../Model/ICustomer";

export const fetchUser = async (
  customerId: number,
  username?: string
): Promise<ICustomer> => {
  const response = await fetch("http://localhost:5001", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      queryResult: {
        queryText: "End-user expression",
        parameters: {
          action: "identity-check",
          "customer-id": customerId,
        },
        outputContexts: [
          {
            name: "identity-check-intent",
            lifespanCount: 5,
            parameters: {
              username,
            },
          },
        ],
      },
    }),
  });
  return await response.json();
};

export const fetchUsers = async (): Promise<ICustomer[]> => {
  const response = await fetch("http://localhost:5001", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
