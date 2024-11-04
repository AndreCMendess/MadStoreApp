$(document).ready(function(){
    
    $('#mobile_btn').on('click',function(){
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

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
        

        if($('#login_form').valid()){
            console.log(email);
            console.log(password);
        }
    });


});