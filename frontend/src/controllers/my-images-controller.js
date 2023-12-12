class MyImagesController {
  async index(req, res){
    const token = req.cookies.token;
    const response = await fetch('http://localhost:5000/api/my-images', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
    })
    const { images } = await response.json()
    res.render('my_images/index', { currentPage: 'my-images', images:  images})
  }

  async deleteImage(req, res) {
    console.log('say hi, in controller')
    const token = req.cookies.token;
    const imageId = req.params.image_id
    const response = await fetch(`http://localhost:5000/api/images/${imageId}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
    })

    if(response.ok) {
      return res.status(200).json({ message: 'Imagem deletada com sucesso', status: 200});
    }
  }
}

module.exports = MyImagesController
