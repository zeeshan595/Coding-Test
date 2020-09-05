import { customers } from "../customers";
import { ICustomer } from "../models/icustomer";

export const performIdentityCheckWithId = async (
  customerId: number
): Promise<ICustomer> => {
  if (customerId < 0) throw Error("invalid customer id");

  const customer: ICustomer = Object.values(customers).find(
    (customer) => customer.id === customerId
  );
  if (!customer) return null;
  return customer;
};

export const performIdentityCheckWithUsername = async (
  username: string
): Promise<ICustomer> => {
  if (!username) throw Error("invalid customer username");
  const customer: ICustomer = Object.values(customers).find(
    (customer) => customer.userName === username
  );
  if (!customer) return null;
  return customer;
};
