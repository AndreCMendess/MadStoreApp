package com.madstore.loja.service;

import com.madstore.loja.DTO.ProdutoDTO;
import com.madstore.loja.model.Produto;
import com.madstore.loja.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    @Autowired
    ProdutoRepository produtoRepository;

    public List<ProdutoDTO> findAll(){
        List<Produto> produtos = produtoRepository.findAll();
        List<ProdutoDTO> produtosDTO = produtos.stream().map(ProdutoDTO::new).toList();
        return produtosDTO;
    }

    public Produto findById(Long id){
        return produtoRepository.findById(id).orElse(null);
    }

    public ProdutoDTO adicionarProduto(ProdutoDTO produtoDTO){
        Produto produto = new Produto();
        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setTamanho(produtoDTO.getTamanho());
        produto.setValor(produtoDTO.getValor());

        Produto novoProduto = produtoRepository.save(produto);

        return new ProdutoDTO(novoProduto);
    }

    public ProdutoDTO atualizarProduto(Long produtoId, ProdutoDTO produtoAtualizado){
        Produto produto = produtoRepository.findById(produtoId).orElse(null);
        assert produto != null;
        produto.setNome(produtoAtualizado.getNome());
        produto.setDescricao(produtoAtualizado.getDescricao());
        produto.setTamanho(produtoAtualizado.getTamanho());
        produto.setValor(produtoAtualizado.getValor());
        produtoRepository.save(produto);
        return new ProdutoDTO(produto);
    }

    public boolean deletarProduto(Long id) {
        if (produtoRepository.existsById(id)) {
            produtoRepository.deleteById(id);
            return true;
        }
        return false;
    }


}
