import { either } from 'fp-ts';
import { Errors } from 'io-ts';

export function JsonParse(string: string): either.Either<Errors, Json> {
  try {
    return either.right(JSON.parse(string));
  } catch (error: unknown) {
    return either.left([
      {
        value: error,
        context: [],
        message: error instanceof Error ? error.message : undefined,
      },
    ]);
  }
}

export function JsonIsObject(json: Json): json is JsonObject {
  return json !== null && typeof json === 'object' && !Array.isArray(json);
}

export type Json = string | number | boolean | null | JsonObject | JsonArray;

export interface JsonObject {
  [x: string]: Json | undefined;
}

interface JsonArray extends Array<Json> {}
