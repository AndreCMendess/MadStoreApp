package com.madstore.loja.model;

public enum UsuarioRole {
    ADMIN("admin");
    private String role;

    UsuarioRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
