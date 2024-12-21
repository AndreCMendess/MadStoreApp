const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Endpoint para atualizar o produto
app.put('/produtos/:id', (req, res) => {
    const produtoId = req.params.id;
    const updatedProduto = req.body;

    // Aqui você deve ler o arquivo JSON onde os produtos estão armazenados
    fs.readFile('produtos.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler os produtos.');
        }

        let produtos = JSON.parse(data);
        const produtoIndex = produtos.findIndex(p => p.id === parseInt(produtoId));

        if (produtoIndex === -1) {
            return res.status(404).send('Produto não encontrado.');
        }

        // Atualiza o produto com os dados recebidos
        produtos[produtoIndex] = { ...produtos[produtoIndex], ...updatedProduto };

        // Salva as alterações de volta no arquivo
        fs.writeFile('produtos.json', JSON.stringify(produtos, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Erro ao salvar o produto.');
            }

            res.status(200).send('Produto atualizado com sucesso.');
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});