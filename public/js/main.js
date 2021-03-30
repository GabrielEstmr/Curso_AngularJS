// angular = acesso global => disponibilizado por <script src="./js/lib/angular.min.js"></script>

//Criação modulo "alurapic"
//tem que ter array vazio

//['minhasDiretivas'] > indica que precisa de minhaDiretivas como dependencia
// angular.module('alurapic', ['minhasDiretivas']);

// COnfig só pode devido ngRoute


//Faz meio que um de-para entre a rota da página e o caminho dos arquivos
// angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute', 'ngResource'])
angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute', 'meusServicos'])// apos inclusao do Service
    .config(function ($routeProvider, $locationProvider) {

        //Sistema de Rotas do Angular
        $locationProvider.html5Mode(true);//Deixa de trabalhar com Hash

        //http://localhost:3000/#/fotos  (tem que ter "#")
        $routeProvider.when('/fotos', {
            templateUrl: 'partials/principal.html',
            controller: 'FotosController'
        })

        //http://localhost:3000/#/fotos  (tem que ter "#")
        $routeProvider.when('/fotos/new', {
            templateUrl: 'partials/foto.html',
            controller: 'FotoController'
        });

        //Aqui: uso mesma parcial de cadastro para otimizar manutenção: se dar manutenção em uma já da em outra (ex: inclusao campo)
        //http://localhost:3000/#/edit/1  (tem que ter "#")
        $routeProvider.when('/fotos/edit/:fotoId', {
            templateUrl: 'partials/foto.html',
            controller: 'FotoController'
        })

        //http://localhost:3000/#/fotos  (tem que ter "#")
        $routeProvider.otherwise({ redirectTo: "/fotos" })

    });