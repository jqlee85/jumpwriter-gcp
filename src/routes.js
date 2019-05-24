import Write from "./components/Write/Write";
import About from "./components/About/About";
import Nouns from "./components/Nouns/Nouns";
import Pieces from "./components/Pieces/Pieces";

const routes = [
  {
    path: "/",
    exact: true,
    component: Write
  },
  {
    path: "/write",
    exact: true,
    component: Write
  },
  {
    path: "/about",
    exact: true,
    props: {},
    component: About
  },
  {
    path: '/nouns',
    exact: true,
    props: {},
    component: Nouns
  },
  {
    path: '/pieces/',
    exact: true,
    props: {},
    component: Pieces
  }
];

export default routes;
