import { ref } from "vue";

const STATE = {
  READY: 0,
  RUNNING: 1,
  REJECT: 2,
}

export const useDebounce  = function<YourFnArgList extends Array<any>, YourFnReturn> (fn: (...args: YourFnArgList) => YourFnReturn) {
  let state = STATE.READY;

  return (...args) => {
    let result = undefined;
    if (state === STATE.READY) {
      state = STATE.RUNNING;
      
      try {
        result = fn.apply(this, args);
      } catch(err) {
        state = STATE.REJECT;
        // todo report.
        console.error(`some error. see：\n${err}`);
      }
      state = STATE.READY;
      return result || 'your fn is finish.';
    }
    return 'your fn is running!';
  }
};


export const useDebounceRAF  = function<YourFnArgList extends Array<any>, YourFnReturn> (fn: (...args: YourFnArgList) => YourFnReturn) {
  let state = STATE.READY;
  const framesRecord = ref(0);

  return (...args) => {
    let result = undefined;
    if (state === STATE.READY) {
      state = STATE.RUNNING;
      return new Promise<YourFnReturn>((resolve, reject) => {
        framesRecord.value = requestAnimationFrame(() => {
          try {
            result = fn.apply(this, args);
          } catch(err) {
            state = STATE.REJECT;
            // todo report.
            console.error(`some error. see：\n${err}`);
            reject(err);
          }
          state = STATE.READY;
          resolve(result || 'your fn is finish.');
        });
        console.log(`run fn, frames is ${framesRecord.value}`);
      })
    }
    return 'your fn is running!';
  }
};
