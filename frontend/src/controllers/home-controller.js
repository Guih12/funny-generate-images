class HomeController {
  index(req, res){
    // make a redirect, if user is not authenticated
    res.render('home/index', { title: 'Bem vindo' })    
  }
}

module.exports = HomeController