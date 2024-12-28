package com.madstore.loja.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Autowired
    SecurityFilter securityFilter;

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfigurations.class);
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        logger.info("Configuração de segurança iniciada.");
        return httpSecurity
                .csrf(csrf -> csrf.disable()) // Desabilitar CSRF, já que estamos usando JWT
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Sem sessão
                .authorizeHttpRequests(authorize -> authorize
                        // Liberar o GET para visualizar a lista de produtos
                        .requestMatchers(HttpMethod.GET, "/madstore/produtos").permitAll()
                        // Liberar o acesso ao formulário de login
                        .requestMatchers(HttpMethod.GET, "/madstore/autenticar/login").permitAll()
                        // Liberar o POST de login para autenticar o usuário e gerar o token
                        .requestMatchers(HttpMethod.POST, "/madstore/autenticar/login").permitAll()
                        // As rotas POST, PUT e DELETE de produtos exigem autenticação via token JWT
                        .requestMatchers(HttpMethod.POST, "/madstore/produtos").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/madstore/produtos/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/madstore/produtos/**").hasRole("ADMIN")
                        // Permitir todas as outras requisições
                        .anyRequest().permitAll()
                )
                // Adiciona o filtro JWT para autenticar as requisições
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }



    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        logger.info("Configurando o AuthenticationManager.");
        AuthenticationManager authenticationManager = authenticationConfiguration.getAuthenticationManager();
        logger.info("AuthenticationManager configurado com sucesso.");
        return authenticationManager;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        logger.info("Configuração do PasswordEncoder: BCryptPasswordEncoder.");
        return  new BCryptPasswordEncoder();
    }
}
