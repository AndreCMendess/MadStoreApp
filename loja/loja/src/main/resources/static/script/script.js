$(document).ready(function(){
    
    // Alterna o menu móvel e o ícone de botão
    $('#mobile_btn').on('click',function(){
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    // Metodo para obter os produtos armazenados no json
    $.get("http://localhost:3000/produtos",function(data , status){
        for (i = 0; i < data.length; i++) {
            $('#catalago').append(`
               <div class="item" data-id="${data[i].id}">
                <div>
                    <i class="btn-edit bi bi-pen-fill"></i>
                </div>
                <div class="item-heart">
                    <i class="fa-solid fa-heart"></i>
                </div>
                <img src="${data[i].image || './src/assets/default.png'}" alt="imagem do produto">

                <h3 class="item-title">${data[i]["item-title"]}</h3>

                <span class="item-description">${data[i]["item-description"]}</span>

                <div class="item-price">
                    <h4>R$${data[i]["item-price"]}</h4>
                    <button class="btn-default">
                        <i class="fa-solid fa-basket-shopping"></i>
                    </button>
                </div>
            </div>
            `);
        }
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
                minlength:"A senha deve conter pelomenos 6 caracteres"
            }
        },errorPlacement: function(error,element){
            error.appendTo(element.parent().find(".error"));
        }
    });

    //validar login
    $('#btn_login').on('click',function(event){
        let email = $("[name='email']").val();
        let password = $("[name='senha']").val();
        
        $('#login').css("display","none");

        //Se o login for valido
        if($('#login_form').valid()){
            //O botao de edit sera visivel
            $('.btn-edit').css("display","flex");
            //Quando clicar no botao de edit de um produto
            $(document).on('click','.btn-edit',function(event){

                // O cloest seleciona o elemento pai do botao selecionado que nese caso o produto
                let item = $(this).closest('.item');

                // Coloca o valor do item-title na variavel titulo
                let titulo = item.find('.item-title').text();
                // Coloca o valor do item-description na variavel desc
                let desc = item.find('.item-description').text();
                 // Coloca o valor do item-preice na variavel preco
                let preco = item.find('.item-price h4').text();

                // Coloca o valor do data-id ,que nesse caso o id do produto em uma variavel
                let itemId = item.data('id');


                // Uma tela sera visivel ao clicar no edit , que salva o id do produto em uma variavel itemId que sera usada posteriomente para atualizar o produto no json
                $('#edit_container').data('item-id',itemId).css("display","flex");

                // O valor do input de titulo do container de edit recebe o valor do titulo do item
                $('#update_title').val(titulo);
                // O valor do input do preço do container de edit recebe o valor do preço do item
                $('#update_price').val(preco.replace('R$','').trim());
                // O valor do input de descriçao do container de edit recebe o valor de descriçao do item
                $('#update_desc').val(desc);
                

                // Ao clicar no botão de update
                $('#btn_update').on('click',function(event){
                    // Desabilita o evento de padrao ao clicar no botao
                    event.preventDefault(); 
                
                    // Aidciona em uma variavel title o valor do input update_title
                    var title = $('#update_title').val();
                      // Aidciona em uma variavel desc o valor do input update_descriction
                    var desc = $('#update_desc').val();
                      // Aidciona em uma variavel price o valor do input update_price
                    var price = $('#update_price').val();

                    // Cria um objeto produto , que recebe os valores do titule , desc e price do formulario
                    const produtoUpdate ={
                        title: title,
                        description: desc,
                        price:price
                    }

                   
                    // Aqui uma requiiçao é feita 
                    $.ajax({
                        //Recebe como url o localhost , endpoint de produtos e o id do produto armazenado na variavel guardada acima
                        url:`http://localhost:3000/produtos/${itemId}`,
                        //Define o tipo da requisiçao como put (atualizaçao)
                        type:'PUT',
                        // Define os dados da requiçao como do tipo JSON
                        data: JSON.stringify(produtoUpdate),
                        // Define o tipo de conteudo como json
                        contentType: 'application/json',
                        // Se for sucesso
                        success:function(response){

                            // Guarda o produto em uma variavel pelo id 
                            var itemUpdate = $('.item[data-id="' + itemId + '"]');
                            // Altera os dados do html do produto com os novos dados
                            itemUpdate.find('.item-title').html(title);
                            itemUpdate.find('.item-description').html(desc);
                            itemUpdate.find('.item-price h4').html('R$ ' + price);
                            // Fecha o container de edit
                            $('#edit_container').css("display","none");
                            console.log("Produto atualizado com sucesso:", response);
                        },
                        error: function(xhr, status, error) {
                            console.error("Erro ao atualizar o produto:", error);
                           
                        }
                    });
                    
                 
                });
            });
        }
    });


});