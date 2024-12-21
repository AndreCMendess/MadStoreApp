package com.madstore.loja.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "produtos")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private String tamanho;
    private Double valor;


}
