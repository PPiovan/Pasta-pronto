import Header from "../components/layouts/Header";
import Experiencia from "../components/home/Experiencia";
import MenuDestacado from "../components/home/MenuDestacado";
import ComoReservar from "../components/home/ComoReservar";
import Eventos from "../components/home/Eventos";
import Contacto from "../components/home/Contacto";
import Footer from "../components/layouts/Footer";

const Inicio = () => {
  return (
    <>
      <Header />
      <Experiencia />
      <MenuDestacado />
      <ComoReservar />
      <Eventos />
      <Contacto />
    </>
  );
};

export default Inicio;