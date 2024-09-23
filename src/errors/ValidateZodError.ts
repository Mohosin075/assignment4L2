import { ZodError } from "zod";

const validateZodError = (err : ZodError) =>{
      const zodError = err?.issues.map(er => {
        return {
          path : er?.path[er?.path?.length - 1],
          message : er.message
        }
      });
      const ZodMessage = zodError.reduce((acc, error) => {
        return `${acc}${error.path} : ${error.message}, `;
      }, "");
  
      return {zodError, ZodMessage}
    }


  export default validateZodError