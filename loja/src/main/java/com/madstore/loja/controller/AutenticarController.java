package com.madstore.loja.controller;

import com.madstore.loja.DTO.LoginResponseDTO;
import com.madstore.loja.DTO.RegisterDTO;
import com.madstore.loja.DTO.UsuarioDTO;
import com.madstore.loja.model.Usuario;
import com.madstore.loja.repository.UsuarioRepository;
import com.madstore.loja.security.TokenService;
import com.madstore.loja.service.AutenticarService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/autenticar")
public class AutenticarController {

    @Autowired
    private AutenticarService autenticarService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private static final Logger logger = LoggerFactory.getLogger(AutenticarController.class);

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid UsuarioDTO usuarioDTO) {

        // Autenticação do usuário
        var userNamePassword = new UsernamePasswordAuthenticationToken(usuarioDTO.email(), usuarioDTO.senha());
        var auth = this.authenticationManager.authenticate(userNamePassword);

        var token = tokenService.generateToken((Usuario) auth.getPrincipal());
        // Se a autenticação for bem-sucedida, retorne uma resposta de sucesso
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/registre")
    public ResponseEntity registre(@RequestBody @Valid RegisterDTO data){
        if(this.usuarioRepository.findByEmail(data.email()) != null) return ResponseEntity.badRequest().build();
        String encriptedPassword = new BCryptPasswordEncoder().encode(data.senha());
        Usuario newUser = new Usuario(data.email(),encriptedPassword,data.role());
        this.usuarioRepository.save(newUser);
        return ResponseEntity.ok().build();
    }




}
