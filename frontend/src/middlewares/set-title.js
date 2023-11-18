const setTitle = (req, res, next) => {
  const pageTitle = `${req.path.split("/").slice(-1)}`;
  res.locals.title = pageTitle;
  next();
}

module.exports = { setTitle }