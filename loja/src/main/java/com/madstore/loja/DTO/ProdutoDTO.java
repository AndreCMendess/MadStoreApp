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

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public String getNome() {
                return nome;
        }

        public void setNome(String nome) {
                this.nome = nome;
        }

        public String getDescricao() {
                return descricao;
        }

        public void setDescricao(String descricao) {
                this.descricao = descricao;
        }

        public String getTamanho() {
                return tamanho;
        }

        public void setTamanho(String tamanho) {
                this.tamanho = tamanho;
        }

        public Double getValor() {
                return valor;
        }

        public void setValor(Double valor) {
                this.valor = valor;
        }
}
