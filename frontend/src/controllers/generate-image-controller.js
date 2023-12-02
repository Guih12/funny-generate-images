class GenerateImageController {
  index(req, res){
    res.render('generate_image/index', { currentPage: 'generate-image' })
  }
}

module.exports = GenerateImageController