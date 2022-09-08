import * as z from 'zod';

export const stringC = z.string;
export const numberC = z.number;
export const dateC = z.date;
export const booleanC = z.boolean;

export const emailC = () => z.string().email().trim();
