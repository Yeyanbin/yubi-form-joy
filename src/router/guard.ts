import { NavigationGuardWithThis } from "vue-router";
import router from ".";

const handleGuard: NavigationGuardWithThis<undefined> = (to, from) => {
  // todo...
  // console.log('guard', to, from);
  if (to.path === '/') {
    router.push('/home');
  }
  return true;
}

export default handleGuard;