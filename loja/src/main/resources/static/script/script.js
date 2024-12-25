$(document).ready(function(){

    // Alterna o menu móvel e o ícone de botão
    $('#mobile_btn').on('click',function(){
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    // Metodo para obter os produtos armazenados no banco de dados
    $.get("http://localhost:8080/madstore/produtos",function(data , status){

        if(status === "success"){
            $('#catalago').empty();

        for (i = 0; i < data.length; i++) {
            $('#catalago').append(`
               <div class="item" data-id="${data[i].id}">
                <div class="btn-container">
                  <i class="btn-edit fas fa-edit"></i>
                  <i class="btn-delete fas fa-trash-alt"></i>
                </div>
                <div class="item-heart">
                    <i class="fa-solid fa-heart"></i>
                </div>
                <img src="${data[i].image || './assets/default.png'}" alt="imagem do produto">

                <h3 class="item-title">${data[i].nome}</h3>

                <span class="item-description">${data[i].descricao}</span>

                <div class="item-price">
                    <h4>R$${data[i].valor.toFixed(2)}</h4>
                    <button class="btn-default">
                        <i class="fa-solid fa-basket-shopping"></i>
                    </button>
                </div>
            </div>
            `);
        }

          $('.btn-edit, .btn-create, .btn-delete').css("display","none");


         $(".btn-edit").on('click',function(event){

            const produtoId =  $(this).closest('.item').data("id");
            console.log("Produto id para editar", produtoId);
            abrirModal(produtoId);
         });

         $(".btn-criar").on('click',function(){
            myModal.show();
             if ($('#form_produto').valid()) {
                                alert('Formulário válido. Produto será atualizado!');
                                // Aqui você pode fazer o AJAX para salvar o produto
                         } else {
                                alert('Formulário inválido. Corrija os erros antes de salvar.');
                         }
         });

        }else{
         console.error("Erro ao carregar produtos");
        }
    }).fail(function(){
        console.error("erro ao fazer requisicao get");
    });

     const myModal = new bootstrap.Modal(document.getElementById('produto_modal'));

     function abrirModal(produtoId){

            $.get(`http://localhost:8080/madstore/produtos/${produtoId}`,function(data , status) {
                if(status === "success"){
                    $('#nome_produto').val(data.nome);
                    $('#desc_produto').val(data.descricao);
                    $('#valor_produto').val(data.valor);

                    myModal.show();
                    console.log(data);
                }else{
                    console.error("Erro ao buscar dados do produto.");
                }
            }).fail(function (){
                console.error("Erro ao buscar dados do produto.")
            });
        }

        $('#btn_update').on('click',function(e){
            e.preventDefault();

             if ($('#form_produto').valid()) {
                    alert('Formulário válido. Produto será atualizado!');
                    // Aqui você pode fazer o AJAX para salvar o produto
             } else {
                    alert('Formulário inválido. Corrija os erros antes de salvar.');
             }

        })






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

    //validar login
    $('#btn_login').on('click',function(event){
        event.preventDefault();

        //Se o login for valido
        if($('#login_form').valid()){

            $('#login').css("display", "none");
            alert("login realizado com sucesso!");
            //O botoes serao visiveis
            $('.btn-edit').css("display","flex");
            $('.btn-create').css("display","flex");
            $('.btn-delete').css("display","flex");

        }else{
         alert("Por favor, digite o email e senha corretas.");
        }

    });


});