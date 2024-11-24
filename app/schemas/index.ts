import * as z from "zod";

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );


  export const FormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string().regex(phoneRegex, 'Invalid Number!'),
    websiteUrl: z.string().url(),
  })

