class HomeController {
  index(req, res){
    return res.render('home/index', { title: 'Bem vindo' })    
  }
}

module.exports = HomeController