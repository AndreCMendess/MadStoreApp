package com.madstore.loja.DTO;


import com.madstore.loja.model.UsuarioRole;

public record RegisterDTO(String email, String senha, UsuarioRole role) {
}
