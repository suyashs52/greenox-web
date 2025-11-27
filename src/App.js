import Navigation from "./Header/Navigation";
import AppRoutes from "./Routes/Routes";
import Footer from "./Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Navigation />
      <ScrollToTop behavior="smooth" />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
