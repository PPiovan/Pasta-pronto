import "../../styles/loginForm.css"
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Nav from "../layouts/Nav/Nav";

const LoginForm = () => {
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { login } = useAuth();
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensaje("");
        setError(false);

        try {
            const response = await fetch(
                "http://localhost:3000/api/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMensaje(data.mensaje);
                login(data.usuario);

                if (Number(data.usuario.id_rol) === 1 || Number(data.usuario.id_rol) === 2) {
                    navigate("/dashboard");
                } else {
                    navigate(from, { replace: true });
                }
            } else {
                setError(true);
                setMensaje(data.mensaje);
            }

        } catch (error) {
            console.error(error);
            setError(true);
            setMensaje("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="form-login">
            <Nav />

            <form onSubmit={handleSubmit}>
                <h1>Iniciar Sesión</h1>

                <label>
                    EMAIL
                    <input
                        type="email"
                        name="email"
                        placeholder="Ingresá tu email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
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
                        disabled={loading}
                    />
                </label>

                {mensaje && (
                    <p className={error ? "mensaje-error" : "mensaje-ok"}>
                        {mensaje}
                    </p>
                )}

                <button type="submit" disabled={loading} className={loading ? "btn-loading" : ""}>
                    {loading ? (
                        <span className="login-spinner-wrap">
                            <span className="login-spinner" />
                            Ingresando...
                        </span>
                    ) : "INGRESAR"}
                </button>

                <p className="form-link">
                    ¿Aún no tenés cuenta?
                    <Link to="/register"> Registrate</Link>
                </p>
            </form>
        </section>
    );
};

export default LoginForm;