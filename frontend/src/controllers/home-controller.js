class HomeController {
  index(req, res){
    // make a redirect, if user is not authenticated
    res.render('home/index', { currentPage: 'home'})    
  }
}

module.exports = HomeController