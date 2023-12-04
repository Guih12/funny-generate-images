class GenerateImageController {
  index(req, res){
    res.render('generate_image/index', { currentPage: 'generate-image' })
  }

  async generate(req, res) {
    const { text } = req.body;
    const token = req.cookies.token;
    
    const response = await fetch('http://localhost:5000/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify({ prompt: text })
    });

    if(response.ok) {
      const data = await response.json();
      return res.status(200).json({ message: 'Imagem gerada com sucesso', status: 200, data });
    }
  }

  async save(req, res) {
    const { url } = req.body;
    const token = req.cookies.token;
    const response = await fetch('http://localhost:5000/api/images/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      body: JSON.stringify({ image_url: url })
    })

    if(response.ok) {
      const data = await response.json();
      return res.status(200).json({ message: 'Imagem salva com sucesso', status: 200, data });
    }
  }

  async like(req, res) {
    const id = req.params.image_id;
    const token = req.cookies.token;
    const response = await fetch(`http://localhost:5000/api/images/${id}/like`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
    })

    if(response.ok) {
      const data = await response.json();
      return res.status(200).json({ message: 'Imagem curtida com sucesso', status: 200, data });
    }
  }
}

module.exports = GenerateImageController