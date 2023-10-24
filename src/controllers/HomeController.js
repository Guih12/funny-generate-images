class HomeController {
  index(req, res){
    return res.render('dashboard/index', { title: 'Home', home_title: 'dashboard' })    
  }
}

module.exports = HomeController