class FeedController {
  index(req, res) {
    res.render('feed/index', { currentPage: 'feed'})
  }
}

module.exports = FeedController