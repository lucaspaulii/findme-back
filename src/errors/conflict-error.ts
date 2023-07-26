import { ApplicationError } from "./types";


export function conflictError(): ApplicationError {
  return {
    name: "conflictError",
    message: "Conflict Error",
  };
}