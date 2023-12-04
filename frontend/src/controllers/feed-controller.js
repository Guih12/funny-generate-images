class FeedController {
  async index(req, res) {
    const response = await fetch('http://localhost:5000/api/all_images')
    const data = await response.json();
    const images = await data.images
    res.render('feed/index', { currentPage: 'feed', images: images})
  }
}

module.exports = FeedController