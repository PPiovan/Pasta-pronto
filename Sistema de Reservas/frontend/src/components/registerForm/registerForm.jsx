import "./registerForm.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false);

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        telefono: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:3000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {

                setError(false);
                setMensaje(data.mensaje);

                setFormData({
                    nombre: "",
                    apellido: "",
                    email: "",
                    password: "",
                    telefono: ""
                });

            } else {

                setError(true);
                setMensaje(data.mensaje);

            }

        } catch (error) {

            setError(true);
            setMensaje("Error al conectar con el servidor");

        }
    };

    return (
        <section className="form-register">

            <form onSubmit={handleSubmit}>

                <h1>Registrarse</h1>

                <label>
                    NOMBRE
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Ingresá tu nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    APELLIDO
                    <input
                        type="text"
                        name="apellido"
                        placeholder="Ingresá tu apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    EMAIL
                    <input
                        type="email"
                        name="email"
                        placeholder="Ingresá tu email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    PASSWORD
                    <input
                        type="password"
                        name="password"
                        placeholder="Ingresá tu contraseña"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    TELEFONO
                    <input
                        type="text"
                        name="telefono"
                        placeholder="Ingresa tu telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                </label>
                {mensaje && (
                    <p className={error ? "mensaje-error" : "mensaje-ok"}>
                        {mensaje}
                    </p>
                )}
                <button type="submit">
                    REGISTRARSE
                </button>
                <p className="form-link">
                    ¿Ya tenes cuenta?
                    <Link to="/login"> Inicia sesion</Link>
                </p>

            </form>

        </section>
    );
};

export default RegisterForm;    