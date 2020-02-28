import { helper } from "@ember/component/helper";

function eq(args) {
  let [arg1, arg2]=args;
  return arg1===arg2;
}

export default helper(eq);
