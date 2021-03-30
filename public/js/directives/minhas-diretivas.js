// angular.module('minhasDiretivas',[]) > array vazio = sem dependencia
angular.module('minhasDiretivas', [])
    .directive('meuPainel', function () {
        //Direction Directive Object => é a diretiva configurada
        var ddo = {};

        //AE: atribute element (pode ser só E ou só A)
        //Atribute: <div nome-atributo="VALOR"></div>
        //Element: <nome-element></nome-element>  IMPORTANTE: Nome diretiva <camelcase> meuPainel e quando puxa: <hifen> meu-painel
        ddo.restric = "AE";

        //Não é o scope do controller: é o scope da Diretiva!!
        //Aqui: props
        ddo.scope = {
            titulo: "@" //OU: titulo: "@"titulo (@ se o nome da prop do escopo for igual a prop que chamamos no HTML)
        };

        // transclude: pego o que está debntro da tag no HTMl e manda pra algum ponto da diretiva que tenho "ng-transclude"
        ddo.transclude = true;
        ddo.templateUrl = './js/directives/meu-painel.html';//EM RELAÇÃO AO HTML PRINCIPAL!!!
        // ddo.template = `
        //     <div class="panel panel-default">
        //         <div class="panel-heading">
        //             <h3 class="panel-title">{{titulo}}</h3>
        //         </div>
        //         <div class="panel-body" ng-transclude>

        //         </div>
        //     </div>`;



        return ddo;
    })
    .directive('minhaFoto', function () {

        var ddo = {};

        ddo.restrict = "AE";

        ddo.scope = {
            titulo: '@',
            url: '@'
        };

        // ddo.templateUrl = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">';
        ddo.template = '<img class="img-responsive center-block" ng-src="{{url}}" alt="{{titulo}}">';

        return ddo;

    })
    .directive('meuBotaoPerigo', function () {

        var ddo = {};

        ddo.restrict = "E";

        //MUITO IMPORTANTE: & => Para nomes de imputs que são iguais os atributos que chamados no elemento ==>> MAS PARA FUNCOES!!!!!!!!!!!
        ddo.scope = {
            nome: '@',
            acao: '&'
        }

        ddo.template = '<button class="btn btn-danger btn-block" ng-click="acao()">{{nome}}</button>';

        return ddo;
    })
    .directive('meuFocus', function () {

        var ddo = {};

        ddo.restrict = "A";

        // ddo.scope = {
        //     focado: '='//quando diretiva e controlle manipulam a mesma propriedade!!!!!!!!!!!!!!!!!!!!
        // };

        //Scopo da diretiva e elemento do DOm que a diretiva foi adicionada
        //WATCHER: só pode colocar na fase de LINK
        // $scop <> scope (rimeio: scope do html/controller e segundo scope da DIRETIVA)
        ddo.link = function (scope, element) {
            // scope.$watch('focado', function () {
            //     if (scope.focado) {
            //         element[0].focus();
            //         scope.focado = false;
            //     }
            // })

            $scope.$on('fotoCadastrada', function () {//se evento FotoCadastrada foi disparada: RODA FUNÇÂO => mais otimizada pois nao tem watcher
                element[0].focus();
            });
        }

        return ddo;
    });

