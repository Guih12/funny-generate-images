class HomeController {
  index(req, res){
    // make a redirect, if user is not authenticated
    res.render('home/index')    
  }
}

module.exports = HomeController