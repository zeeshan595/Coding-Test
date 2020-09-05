import { HomePage } from "./View/HomePage/HomePage";

export interface Navigation {
  path: string;
  component: React.ComponentClass<any, any>;
  exact?: boolean;
}

export const navigation: Navigation[] = [
  {
    path: "/",
    component: HomePage,
    exact: false,
  },
];
