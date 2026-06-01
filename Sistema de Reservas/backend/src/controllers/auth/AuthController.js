import { Usuario } from "../../models/Usuario.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!email || !password) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios",
      });
    }

    // Buscar usuario
    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    // Verificar activo
    if (!usuario.activo) {
      return res.status(403).json({
        mensaje: "Usuario deshabilitado",
      });
    }

    // Comparar contraseña
    const coincide = await bcrypt.compare(password, usuario.password);
    if(!coincide){
      return res.status(401).json({
        mensaje: "Password incorrecta"
      });
    }

    return res.status(200).json({
      mensaje: "Login correcto",
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.id_rol,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};

export const register = async (req, res) => {
    try {

        const {
            nombre,
            apellido,
            email,
            password,
            telefono
        } = req.body;

        if (
            !nombre ||
            !apellido ||
            !email ||
            !password
        ) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const existeUsuario = await Usuario.findOne({
            where: { email }
        });

        if (existeUsuario) {
            return res.status(400).json({
                mensaje: "El email ya está registrado"
            });
        }

        const passwordHash = await bcrypt.hash(
            password,
            10
        );

        const usuario = await Usuario.create({
            id_rol: 3,
            nombre,
            apellido,
            email,
            password: passwordHash,
            telefono,
            activo: true
        });

        return res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            id: usuario.id_usuario
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error interno"
        });

    }
};