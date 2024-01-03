export const FormReducer = (state, { key, payload }) => {
  switch (key) {
    case "rs":
      state.rs.value = payload.newValue;
      state.rs.error = payload.error;
      return;
    case "ls":
      state.ls.value = payload.newValue;
      state.ls.error = payload.error;
      return;
    case "lc":
      state.lc.value = payload.newValue;
      return;
    case "rc":
      state.rc.value = payload.newValue;
      return;
    case "ladd":
      state.ladd.value = payload.newValue;
      return;
    case "radd":
      state.radd.value = payload.newValue;
      return;
    case "powerType":
      state.powerType.value = payload.newValue;
      return;
    case "lensType":
      state.lensType.value = payload.newValue;
      return;
    case "frameType":
      state.frameType.value = payload.newValue;
      return;
    case "lang":
      state.lang.value = payload.newValue;
      return;
    case "step":
      state.step = payload.newValue;
      return;
    case "loading":
        state.loading=payload.newValue  
    case "buttonClicked":
        state.buttonClicked=payload.newValue  
  }
};
