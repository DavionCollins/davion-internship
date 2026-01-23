import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  function ItemDetailsWrapper() {
    const { id } = useParams();
    return <ItemDetails nftId={id} />;
  }

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details/:id" element={<ItemDetailsWrapper />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
