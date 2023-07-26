import { ApplicationError } from "./types";

export function SMSError(): ApplicationError {
  return {
    name: "SMSError",
    message: "Error while trying to send SMS",
  };
}