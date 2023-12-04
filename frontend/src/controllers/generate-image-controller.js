class GenerateImageController {
  index(req, res){
    res.render('generate_image/index', { currentPage: 'generate-image' })
  }

  async generate(req, res) {
    const { text } = req.body;
    const token = req.cookies.token;
    const response = await fetch('http://localhost:5000/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ prompt: text })
    });

    if(response.ok) {
      const data = await response.json();
      return res.status(200).json({ message: 'Imagem gerada com sucesso', status: 200, data });
    }
  }
}

module.exports = GenerateImageController