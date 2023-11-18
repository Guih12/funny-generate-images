class HomeController {
  index(req, res){
    res.render('home/index', { title: 'Bem vindo' })    
  }
}

module.exports = HomeController