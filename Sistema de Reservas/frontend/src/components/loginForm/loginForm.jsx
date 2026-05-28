import "./LoginForm.css"
import { useState } from "react"

const LoginForm = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(formData)
    }

    return (
        <section className="form-login">

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

                <button type="submit">
                    INGRESAR
                </button>

            </form>

        </section>
    )
}

export default LoginForm
