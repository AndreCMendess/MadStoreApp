package com.madstore.loja.controller;

import com.madstore.loja.DTO.ProdutoDTO;
import com.madstore.loja.model.Produto;
import com.madstore.loja.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/produtos")
public class ProdutoController {
    @Autowired
    ProdutoService produtoService;

    @GetMapping
    public ResponseEntity<List<ProdutoDTO>> findAll(){
        return ResponseEntity.ok(produtoService.findAll());
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<Produto> findById(@PathVariable Long id){
        return ResponseEntity.ok(produtoService.findById(id));
    }

    @PutMapping(value="/{id}")
    public ResponseEntity<ProdutoDTO> atualizarProduto(@PathVariable Long id, @RequestBody ProdutoDTO produtoAtualizado){
        return ResponseEntity.ok(produtoService.atualizarProduto(id,produtoAtualizado));
    }

    @PostMapping
    public ResponseEntity<ProdutoDTO> adicionarProduto(@RequestBody ProdutoDTO novoProduto){
        return ResponseEntity.ok(produtoService.adicionarProduto(novoProduto));
    }

    @DeleteMapping(value="/{id}")
    public ResponseEntity deletarProduto(@PathVariable Long id){
        return ResponseEntity.ok(produtoService.deletarProduto(id));
    }
}
