import { ApplicationError } from "./types";

export function locationRequestError(details: string[]): ApplicationError {
  return {
    name: "locationRequestError",
    message: "Error while trying to get location",
  };
}
