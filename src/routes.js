import Write from "./components/Write/Write";
import Edit from "./components/Edit/Edit";
import About from "./components/About/About";
import Nouns from "./components/Nouns/Nouns";
import Pieces from "./components/Pieces/Pieces";
import Terms from "./components/Terms/Terms";

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
    path: '/terms-and-privacy',
    exact: true,
    props: {},
    component: Terms
  },
  {
    path: '/nouns',
    exact: true,
    props: {},
    component: Nouns
  },
  {
    path: '/writing/',
    exact: true,
    props: {},
    component: Pieces
  },
  {
    path: '/writing/:pieceID',
    component: Edit,
  }
];

export default routes;
