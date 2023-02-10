import { ApplicationError } from "@/protocols";

export function cannotUpdateError(field: string): ApplicationError {
    return {
      name: "CannotUpdateError",
      message: `Cannot update ${field}!`,
    };
  }