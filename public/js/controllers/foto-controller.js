// angular.module('alurapic',[]) => nao é assim pois estariamos criando novo modulo 
//QUero atrelar esse modulo ao modulo principal main/alurapic
// angular.module('alurapic').controller('FotoController', function ($scope, $http, $routeParams, $resource) {
// angular.module('alurapic').controller('FotoController', function ($scope, recursoFoto, $routeParams,) {
angular.module('alurapic').controller('FotoController', function ($scope, cadastroDeFotos, $routeParams, recursoFoto) {//apos service

    $scope.foto = {};
    $scope.mensagem = '';

    // // //method:'PUT' criando novo metodo e falando que ele é tipo PUT
    // // const recursoFoto = $resource('v1/fotos/:fotoId', null, {
    // //     update: {
    // //         method: 'PUT'
    // //     }
    // // });

    if ($routeParams.fotoId) {
        recursoFoto.get({ fotoId: $routeParams.fotoId }, function (data) {
            $scope.foto = data;
        }, function (err) {
            console.log(err);
            $scope.mensagem = 'Não foi possível obter a foto';
        });
    };
    $scope.submeter = function () {
        if ($scope.formulario.$valid) {

            cadastroDeFotos.cadastrar($scope.foto)
                .then(function (dados) {
                    $scope.mensagem = dados.mensagem;
                    // $scope.focado = true;
                    $scope.$broadcast('fotoCadastrada');
                    if (dados.inclusao) {
                        $scope.foto = {};
                    }
                })
                .catch(function (dados) {
                    $scope.mensagem = dados.mensagem;
                })

            //ANTES DE SERVICE
            // // //Se minha foto já tem id: edit se nao é post
            // // if ($routeParams.fotoId) {
            // //     recursoFoto.update({ fotoId: $scope.foto._id }, $scope.foto, function () {
            // //         $scope.mensagem = 'Foto ' + $scope.foto.titulo + ' foi alterada';
            // //     }, function (err) {
            // //         console.log(err);
            // //         $scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto.titulo;
            // //     })
            // // } else {
            // //     recursoFoto.save($scope.foto, function () {
            // //         $scope.mensagem = 'Foto adicionada com sucesso';
            // //     }, function (err) {
            // //         console.log(err);
            // //         $scope.mensagem = 'Não foi possível salvar a foto ' + $scope.foto.titulo;
            // //     });
            // // }
        }
    }

    // // // // // if ($routeParams.fotoId) {
    // // // // //     $http.get('v1/fotos/' + $routeParams.fotoId)
    // // // // //         .success(function (foto) {
    // // // // //             $scope.foto = foto;
    // // // // //         })
    // // // // //         .error(function (err) {
    // // // // //             console.log(err);
    // // // // //             $scope.mensagem = 'Não foi possível obter a foto de ID: ' + $routeParams.fotoId;
    // // // // //         });
    // // // // // }

    // // // // // $scope.submeter = function () {

    // // // // //     if ($scope.formulario.$valid) {
    // // // // //         //Se minha foto já tem id: edit se nao é post


    // // // // //         if ($routeParams.fotoId) {
    // // // // //             $http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)
    // // // // //                 .success(function () {
    // // // // //                     $scope.mensagem = 'Foto ' + $scope.foto.titulo + ' foi alterada';
    // // // // //                     console.log('Foto ' + $scope.foto.titulo + ' foi alterada');

    // // // // //                 })
    // // // // //                 .error(function (err) {
    // // // // //                     console.log(err);
    // // // // //                     $scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto.titulo;
    // // // // //                 });
    // // // // //         } else {
    // // // // //             $http.post('/v1/fotos', $scope.foto)
    // // // // //                 .success(function () {
    // // // // //                     $scope.mensagem = 'Foto adicionada com sucesso';
    // // // // //                 })
    // // // // //                 .error(function (err) {
    // // // // //                     console.log(err);
    // // // // //                     $scope.mensagem = 'Não foi possível cadastra a foto';
    // // // // //                 })
    // // // // //         }

    // // // // //     }
    // // // // // };
})