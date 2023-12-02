const axios = require("axios")

class AuthController {
  signIn(req, res) {
    res.render('auth/sign-in/index', { currentPage: 'sign-in'})
  }

  signUp(req, res) {
    res.render('auth/sign-up/index', { currentPage: 'sign-up'})
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
      });

      if (response.status === 200) {
          const data = await response.json();
          res.cookie('token', data.token, { maxAge: 900000, httpOnly: true });
          return res.status(200).json({ message: 'Usuário autenticado com sucesso', status: 200  });
      }

      if (response.status === 401) {
          return res.status(401).json({ error: 'unauthorized', message: 'Usuário ou senha inválidos' });
      }

    }catch (error) {
        console.error('Erro durante a requisição:', error.message);
        res.status(500).json({ error: 'internal_server_error', message: 'Ocorreu um erro interno no servidor' });
    } 
  }

  async register(req, res) {
    try{
      const { name ,email, password } = req.body;
      const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
      });

      if (response.status === 200) {
          return res.status(200).json({ message: 'Usuário criado com sucesso', status: 201 });
      }

      if(response.status === 422) {
        return res.status(401).json({ error: 'bad_request', message: 'Erro ao salvar usuário' });
      }
    }catch (error) {
        console.error('Erro durante a requisição:', error.message);
        res.status(500).json({ error: 'internal_server_error', message: 'Ocorreu um erro interno no servidor' });
    }
  }
}

module.exports = AuthController