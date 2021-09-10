import { NavigationGuardWithThis } from "vue-router";

const handleGuard: NavigationGuardWithThis<undefined> = (to, from) => {
  // todo...
  return true;
}

export default handleGuard;