// FotosController: NOME DO MODULO (CamelCase)
//Arquivos JS: minusculo e hifen (fotos-controller)
//$scope = fala pra usar o scopo original do js no html

// //$http: responsável por fazer requisição http (AJAX)

//CONTROLLER: nao é bom o controller manipular o DOM!!!!!!!!!! > 

// CONTROLLER e SERVICOS: LOGICA
// DIRETIVAS.JS => MANIPULAÇÂO DOM

// angular.module('alurapic').controller('FotosController', function ($scope, $http, $resource) {
angular.module('alurapic').controller('FotosController', function ($scope, recursoFoto) {
    $scope.fotos = [];
    $scope.filtro = "";
    $scope.mensagem = '';

    // const recursoFoto = $resource('v1/fotos/:fotoId')




    //Sabe que [e get e já pega rota certa]
    recursoFoto.query(function (data) {
        $scope.fotos = data;
    }, function (err) {
        console.log(err);
    });


    $scope.remover = function (foto) {

        recursoFoto.delete({ fotoId: foto._id }, function () {
            const indiceFoto = $scope.fotos.indexOf(foto);
            $scope.fotos.splice(indiceFoto, 1);
            $scope.mensagem = "Foto " + foto.titulo + " removida com sucesso";
        }, function (err) {
            console.log(err);
            $scope.mensagem = "Não foi possível remover " + foto.titulo;
        })

    }

    // // // $http.get('v1/fotos')
    // // //     .success(function (data) {
    // // //         $scope.fotos = data;
    // // //     })
    // // //     .error(function (err) {
    // // //         console.log(err);
    // // //     });


    // // // ////Primeira forma
    // // // // var promise = $http.get('v1/fotos');
    // // // // promise.then(function (retorno) {
    // // // //     $scope.fotos = retorno.data;
    // // // // }).catch(function (error) {
    // // // //     console.log(error);
    // // // // });


    // // // $scope.remover = function (foto) {
    // // //     console.log(foto)

    // // //     $http.delete('v1/fotos/' + foto._id)
    // // //         .success(function (data) {
    // // //             $scope.mensagem = "Foto " + foto.titulo + " removida com sucesso";

    // // //             //Removendo foto da array fotos
    // // //             const indiceFoto = $scope.fotos.indexOf(foto);
    // // //             $scope.fotos.splice(indiceFoto, 1);
    // // //         })
    // // //         .error(function (err) {
    // // //             console.log(err);
    // // //             $scope.mensagem = "Não foi possível remover " + foto.titulo;
    // // //         });
    // // // };

});