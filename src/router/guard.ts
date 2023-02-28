import { NavigationGuardWithThis } from "vue-router";
import router from ".";

const getUrlPrefix = () => {
  return import.meta.env.VITE_PUBLIC_PATH;
}

const handleGuard: NavigationGuardWithThis<undefined> = (to, from) => {
  // todo...
  // console.log('guard', to, from);
  
  // if (to.path === '/') {
  // }
  return true;
}

export default handleGuard;