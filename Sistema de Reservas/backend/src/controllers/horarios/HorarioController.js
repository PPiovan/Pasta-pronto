import { Horario } from "../../models/Horario.js";

export const obtenerHorarios = async (req, res) => {
  try {

    const horarios = await Horario.findAll({
      where: {
        activo: true
      },
      order: [["hora", "ASC"]]
    });

    res.status(200).json(horarios);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener horarios"
    });

  }
};