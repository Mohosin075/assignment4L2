import { z } from "zod";

const categorySchemaValidation = z.object({
    name : z.string({invalid_type_error : 'name should be string'})
});

export const categoryValidations = {
    categorySchemaValidation
}