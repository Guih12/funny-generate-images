class MyImagesController {
  index(req, res){
    res.render('my_images/index', { currentPage: 'my-images' })
  }
}

module.exports = MyImagesController