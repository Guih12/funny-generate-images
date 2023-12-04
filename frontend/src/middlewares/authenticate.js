const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/auth/signin');
  }
  next();
}

module.exports = { authenticate }