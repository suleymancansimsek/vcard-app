"use server";

import * as z from "zod";
import vCardsJS from "vcards-js";
import { FormSchema } from "../schemas";

// Server Action to generate a vCard string
export const generateVCard = async (values: z.infer<typeof FormSchema>) => {
  const validatedFields = FormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields. Please check your input." };
  }

  const { firstName, lastName, email, phone, websiteUrl } = validatedFields.data;

  const vCard = vCardsJS();
  vCard.firstName = firstName;
  vCard.lastName = lastName;
  vCard.email = email;
  vCard.cellPhone = phone;
  vCard.url = websiteUrl;

  return { data: vCard.getFormattedString() };
};
