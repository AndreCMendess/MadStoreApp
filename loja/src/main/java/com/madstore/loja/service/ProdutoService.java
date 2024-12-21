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

}
