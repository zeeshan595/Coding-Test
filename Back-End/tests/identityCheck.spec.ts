import {
  performIdentityCheckWithId,
  performIdentityCheckWithUsername,
} from "../src/controller/identityCheck";
import { customers } from "../src/customers";

describe("performIdentityCheckWithId(int)", () => {
  //
  test("should return valid customer when valid id is provided", async () => {
    const actual = await performIdentityCheckWithId(customers[0].id);
    expect(actual).toEqual(customers[0]);
  });

  //
  test("should throw an error when invalid customer id is provided", async () => {
    let error;
    try {
      await performIdentityCheckWithId(-1);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error("invalid customer id"));
  });

  //
  test("should return null when customer is not found", async () => {
    const actual = await performIdentityCheckWithId(5);
    expect(actual).toEqual(null);
  });
});

describe("performIdentityCheckWithUsername(string)", () => {
  //
  test("should return valid customer when valid username is provided", async () => {
    const actual = await performIdentityCheckWithUsername(
      customers[0].userName
    );
    expect(actual).toEqual(customers[0]);
  });

  //
  test("should throw an error when invalid customer username is provided", async () => {
    let error;
    try {
      await performIdentityCheckWithUsername(undefined);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error("invalid customer username"));
  });

  //
  test("should return null when customer is not found", async () => {
    const actual = await performIdentityCheckWithUsername("a cool name");
    expect(actual).toEqual(null);
  });
});
