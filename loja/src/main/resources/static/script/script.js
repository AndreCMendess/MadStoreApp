$(document).ready(function(){

    const myModal = new bootstrap.Modal(document.getElementById('produto_modal'));
    let modalTipo= "";

       function getAuthToken() {
                    return localStorage.getItem('authToken');
       }

       $.ajaxSetup({
                    beforeSend: function(xhr) {
                        let token = getAuthToken();
                        if (token) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                        }
                    }
       });

     //validar login
        $('#btn_login').on('click',function(event){
            event.preventDefault();

            //Se o login for valido
            if($('#login_form').valid()){

                let email = $('#txt_email').val();
                let senha = $('#txt_password').val();
                console.log('Dados enviados:', { email: email, senha: senha });

                $.ajax({

                    url: 'http://localhost:8080/madstore/autenticar/login',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        email: email,
                        senha: senha

                    }),
                    success: function(response){
                          console.log('login bem sucedido', response);
                            $('#message-login').text('Login realizado com sucesso!').fadeIn().delay(3000).fadeOut();
                                                                          setTimeout(function() {
                                                                              $('#login').css("display", "none");
                                                                    }, 2000);
                          localStorage.setItem('authToken', response.token);
                          console.log('Login bem-sucedido. Token armazenado:', response.token);
                          verificarAutenticacao();

                    },
                    error: function(xhr, status, error) {

                        console.error('Erro no login', error);
                        console.error('Detalhes do erro:', xhr.responseText);
                        $('#message-login').text('Por favor digite o login e senha corretos!').fadeIn().delay(3000).fadeOut();
                                                                        setTimeout(function() {
                                                                  }, 2000);
                    }

                });
            }else{
              $('#message-login').text('Por favor digite o login e senha corretos').fadeIn().delay(3000).fadeOut();
                                                             setTimeout(function() {

                                                       }, 2000);
            }

        });

    // Alterna o menu móvel e o ícone de botão
    $('#mobile_btn').on('click',function(){
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    function carregarCatalogo(){
          // Metodo para obter os produtos armazenados no banco de dados
            $.ajax({
                url: "http://localhost:8080/madstore/produtos",
                method: "GET",
                success(data) {
                    $('#catalago').empty();

                    data.forEach(function(produto) {
                        $('#catalago').append(`
                            <div class="item" data-id="${produto.id}">
                               <div class="btn-container">
                                   <i class="btn-edit fas fa-edit"></i>
                                   <i class="btn-delete fas fa-trash-alt"></i>
                               </div>
                               <div class="item-heart">
                                   <i class="fa-solid fa-heart"></i>
                               </div>
                               <img src="${produto.image || './assets/default.png'}" alt="imagem do produto">

                               <h3 class="item-title">${produto.nome}</h3>

                               <span class="item-description">${produto.descricao}</span>

                               <div class="item-price">
                                    <h4>R$${produto.valor.toFixed(2)}</h4>
                                    <button class="btn-default">
                                           <i class="fa-solid fa-basket-shopping"></i>
                                    </button>
                               </div>
                            </div>
                        `);
                    });

                   verificarAutenticacao();

                },error: function(xhr, status, error){
                   console.error("Erro ao carregar os produtos:", status, error);

                   $('#catalago').html("<p>Ocorreu um erro ao carregar os produtos. Tente novamente mais tarde.</p>");
                }
            });
    }


     function abrirModalCadastrar(){
            modalTipo = "cadastrar"
            $('#produtoModalLabel').text("Cadastrar novo Produto");
            myModal.show();
     }

     function abrirModalAtualizar(produtoId){
                modalTipo = "atualizar"
                console.log("Abrindo modal de atualização com produto ID:", produtoId); // Verifique se o ID está correto
                $('#produtoModalLabel').text("Atualizar Produto");
                $.get(`http://localhost:8080/madstore/produtos/${produtoId}`,function(data , status) {
                    if(status === "success"){
                        $('#nome_produto').val(data.nome);
                        $('#desc_produto').val(data.descricao);
                        $('#valor_produto').val(data.valor);
                        $('#produto_id').val(produtoId);
                        myModal.show();
                        console.log(data);
                    }else{
                        console.error("Erro ao buscar dados do produto.");
                    }
                }).fail(function (){
                    console.error("Erro ao buscar dados do produto.")
                });
         }

    $(document).on('click', '.btn-edit', function(event) {
        const produtoId = $(this).closest('.item').data("id");
        console.log("Produto id para editar", produtoId);
        abrirModalAtualizar(produtoId);
    });

    $('.btn-create').on('click',function(){
       abrirModalCadastrar();

    });

    let produtoIdDelete = null;

    $(document).on('click', '.btn-delete', function(event) {
         produtoIdDelete =  $(this).closest('.item').data("id");
         console.log("Produto id para deletar:", produtoIdDelete);
         $('#confirm_delete_modal').modal('show');
    });

    $('#btn_confirm_delete').on('click', function(){
        $.ajax({
            url:`http://localhost:8080/madstore/produtos/${produtoIdDelete}`,
            method: 'DELETE',
            success: function(response) {
                carregarCatalogo();
                $('#message-delete').text('Produto deletado com sucesso!').fadeIn().delay(3000).fadeOut();
                      setTimeout(function() {
                      $('#confirm_delete_modal').modal('hide');
                }, 2000);
            },
            error: function() {
            }
        });
    });

        $('#btn_update').on('click',function(e){
            e.preventDefault();

             if ($('#form_produto').valid()) {

                let produtoId = $('#produto_id').val();

                if(modalTipo === 'atualizar'){

                    let produto = {
                       nome: $('#nome_produto').val(),
                       descricao: $('#desc_produto').val(),
                       valor: $('#valor_produto').val()
                    }

                    $.ajax({
                         url: `http://localhost:8080/madstore/produtos/${produtoId}`,
                         method: "PUT",
                         data: JSON.stringify(produto),
                         contentType: "application/json",
                         success: function(response) {
                             carregarCatalogo();
                             $('#message-box').text('Produto atualizado com sucesso!').fadeIn().delay(3000).fadeOut();
                                setTimeout(function() {
                                $('#produto_modal').modal('hide');
                             }, 2000);
                         }
                    })

                }else{

                    let produto = {
                        nome: $('#nome_produto').val(),
                        descricao: $('#desc_produto').val(),
                        valor: $('#valor_produto').val()
                    }

                    $.ajax({
                        url: "http://localhost:8080/madstore/produtos",
                        method: "POST",
                        data: JSON.stringify(produto),
                        contentType: "application/json",
                        success: function(response) {
                            carregarCatalogo();
                            $('#message-box').text('Produto cadastrado com sucesso!').fadeIn().delay(3000).fadeOut();
                              setTimeout(function() {
                              $('#produto_modal').modal('hide');
                              $('#form_produto')[0].reset();
                            }, 2000);

                        },error: function(xhr,status,error) {
                            $('#message-box').text('Falha ao cadastrar novo produto!').fadeIn().delay(3000).fadeOut();
                            $('#message-box').addClass('error');
                            console.log('Erro na requisição: ', error);
                            console.log('Status: ', status);
                            console.log('Resposta do servidor: ', xhr.responseText);
                            $('#message-box').fadeOut(3000, function() {
                                $(this).removeClass('error');
                            });
                        }

                    })

                }

             } else {
                     $('#message-box').text('Por favor, corrija os erros do formulario.').fadeIn().delay(3000).fadeOut();
                     $('#message-box').addClass('error');
                     $('#message-box').fadeOut(3000, function() {
                          $(this).removeClass('error');
                     });
             }
        });

        $('#produto_modal').on('hidden.bs.modal', function() {
            modalTipo = '';
            $('#form_produto').validate().resetForm();
            $('#form_produto').find('.is-invalid').removeClass('is-invalid');
            $('#form_produto').find('.is-valid').removeClass('is-valid');
        });

    const sections = $('section');
    const navItems = $('.nav-item');

    // Evento de rolagem da janela
    $(window).on('scroll',function () {

        const header = $('header');
        const scrollPosition= $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;
        
        if(scrollPosition <= 0){
            header.css('box-shadow','none');
        }else{
            header.css('box-shadow','5px 1px 5px rgba(0,0,0,0.1)');
        }

        sections.each(function(i){
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBot = sectionTop + section.outerHeight();

            if(scrollPosition >= sectionTop && scrollPosition < sectionBot){
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');

    });


    ScrollReveal().reveal('#cta',{
        origin:'left',
        duration: 2000,
        distance:'20%'

    });

    ScrollReveal().reveal('#catalago',{
        origin:'left',
        duration: 2000,
        distance:'20%'

    });

    ScrollReveal().reveal('#sobre_nos',{
        origin:'right',
        duration: 2000,
        distance:'20%'

    });

     //Atalho crtl + shift + l para tela de login aparecer
     $(document).on('keydown',function(event){
        if(event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'l'){
            event.preventDefault();
            $('#login').toggle();
           
        }

    });

    function validarLogin(){
          //validar dados de entrada de login
            $.validator.addMethod("senhaSegura",function(value,element){
                return this.optional(element) || /^(?=.*[A-Za-z])(?=.*\d).+$/.test(value);
            }, " A senha deve conter pelomenos uma letra e um numero");

            $('#login_form').validate({
                rules:{
                    email:{
                        required:true,
                        email:true
                    },
                    senha:{
                        required:true,
                        senhaSegura:true,
                        minlength:6

                    }
                },
                messages:{
                    email:{
                        required:"O email é obrigatorio para autenticação",
                        email:"O email deve ser valido"
                    },
                    senha:{
                        required:"Por favor ensira sua senha",
                        minlength:"A senha deve conter pelo menos 6 caracteres"
                    }
                },errorPlacement: function(error,element){
                    error.appendTo(element.parent().find(".error"));
                }
            });

    }

    function validarProduto() {
          $.validator.addMethod("valorMonetario", function(value, element) {
                return this.optional(element) || /^(\d+(\.\d{1,2})?)$/.test(value);  // Aceita valores com até duas casas decimais
            }, "Por favor, insira um valor monetário válido");

            $('#form_produto').validate({
                rules:{
                    nome:{
                        required:true
                    },
                    desc:{
                        required:true
                    },
                    valor:{
                        required:true,
                        number:true,
                        min: 0.01,
                        valorMonetario:true


                    }
                },
                messages:{
                    nome:{
                         required:"O nome do produto é obrigatorio"
                    },
                    desc:{
                        required: "A descrição do produto é obrigatoria"
                    },
                    valor:{
                        required: "O valor do produto é obrigatorio",
                        number: "Precisa ser um numero valido",
                        min:"O valor precisa ser maior que 0",
                        valorMonetario: "Por favor , Insira um valor válido exemplo: 20,00"
                    }

                },
                errorPlacement: function(error,element){
                    error.appendTo(element.parent().find(".error"))
                }
            });
    }

    function verificarAutenticacao() {
        let token = getAuthToken();
        if (token && token !== "null" && token !== "") {
            $('.btn-edit, .btn-create, .btn-delete').css("display", "flex");
            console.log("usuario autenticado: token on")
        } else {
            $('.btn-edit, .btn-create, .btn-delete').css("display", "none");
        }
    }









    carregarCatalogo();
    validarLogin();
    validarProduto();

});