package com.madstore.loja.controller;

import com.madstore.loja.DTO.ProdutoDTO;
import com.madstore.loja.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/produtos")
public class ProdutoController {
    @Autowired
    ProdutoService produtoService;

    public List<ProdutoDTO> findAll(){
        return produtoService.findAll();
    }
}
