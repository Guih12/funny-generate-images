class AuthController {
  signIn(req, res) {
    res.render('auth/sign-in/index')
  }

  signUp(req, res) {
    res.render('auth/sign-up/index')
  }
}

module.exports = AuthController