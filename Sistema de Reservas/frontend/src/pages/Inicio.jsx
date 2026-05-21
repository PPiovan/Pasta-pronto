import Header from "../components/layouts/Header/Header";
import Experiencia from "../components/home/Experiencia/Experiencia";
import MenuDestacado from "../components/home/MenuDestacado/MenuDestacado";
import ComoReservar from "../components/home/ComoReservar/ComoReservar";
import Eventos from "../components/home/Eventos/Eventos";
import Contacto from "../components/home/Contacto/Contacto";
import Footer from "../components/layouts/Footer/Footer";

const Inicio = () => {
  return (
    <>
      <Header />
      <Experiencia />
      <MenuDestacado />
      <ComoReservar />
      <Eventos />
      <Contacto />
      <Footer/>
    </>
  );
};

export default Inicio;