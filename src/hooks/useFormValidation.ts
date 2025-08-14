import { useState } from "react";

export const useFormValidation = (schema) => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const validate = (data: unknown) => {
    const result = schema.safeParse(data);

    if (!result.success) {
      const errors = result.error?._zod.def.map((error) => ({
        path: error.path[0],
        error: error.message,
      }));
      setErrors(errors);
      return null;
    }

    setErrors({});
    return result.data;
  };

  return { errors, validate };
};
