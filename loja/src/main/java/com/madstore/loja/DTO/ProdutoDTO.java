package com.madstore.loja.DTO;

import com.madstore.loja.model.Produto;
import lombok.Data;

@Data
public class ProdutoDTO {
        private Long id;
        private String nome;
        private String descricao;
        private String tamanho;
        private Double valor;

        public ProdutoDTO(Produto produto) {
                this.id = produto.getId();
                this.nome = produto.getNome();
                this.descricao = produto.getDescricao();
                this.tamanho = produto.getTamanho();
                this.valor = produto.getValor();
        }
}
