import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };

  return (
    <div className="login-form-div">
      <h3>Bem-vindo ao Advanced ToDo List</h3>

      <form onSubmit={submit} className="login-form">
        <div>
          <input
            type="text"
            placeholder="Usuário"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Senha"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Entrar</button>
        </div>
      </form>

      <br />
      <button className="register-button">Cadastrar</button>
      <br /><br />
      <button className="reset-password-button">Recuperar Senha</button>
    </div>
  )
}