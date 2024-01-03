const VALIDATION_FUNCTIONS = {
  required(val, errMsg) {
    return !!val ? null : errMsg;
  }
};

const VALIDATION_LIST = {
  rs: {
    required: (val) =>
      VALIDATION_FUNCTIONS.required(val, "Required"),
  },
  ls: {
    required: (val) =>
      VALIDATION_FUNCTIONS.required(val, "Required"),
  },
  
};

export function validateInput(inputName, val) {
  const validations = VALIDATION_LIST[inputName];
  if (validations) {
    for (const rule of Object.values(validations)) {
      const isInvalid = rule(val);
      if (isInvalid) {
        return isInvalid;
      }
    }
  }
  return null;
}
