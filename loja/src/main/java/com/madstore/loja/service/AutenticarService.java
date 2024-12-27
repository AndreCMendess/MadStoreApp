package com.madstore.loja.service;

import com.madstore.loja.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutenticarService implements UserDetailsService {
    private static final Logger logger = LoggerFactory.getLogger(AutenticarService.class);

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("Iniciando o processo de carregamento de usuário para o email: {}", username);

        UserDetails usuario = usuarioRepository.findByEmail(username);

        if (usuario == null) {
            logger.error("Usuário com o email {} não encontrado.", username);
            throw new UsernameNotFoundException("Usuário não encontrado");
        }

        logger.info("Usuário encontrado: {}", usuario.getUsername());
        return usuarioRepository.findByEmail(username);

    }
}
