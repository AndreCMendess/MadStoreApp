package com.madstore.loja.repository;

import com.madstore.loja.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository <Produto,Long>{
}
