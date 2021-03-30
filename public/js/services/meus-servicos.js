angular.module('meusServicos', ['ngResource'])//ngResource passou de main pra ca e colocou MeusServicos como dependencia de main
    .factory('recursoFoto', function ($resource) {

        //method:'PUT' criando novo metodo e falando que ele é tipo PUT
        return $resource('v1/fotos/:fotoId', null, {
            update: {
                method: 'PUT'
            }
        });

    })
    .factory('cadastroDeFotos', function (recursoFoto, $q) {//aqui: um servico depende de outro
        // $q: permite criar PROMISES

        let servico = {};

        servico.cadastrar = function (foto) {
            //resolve => then
            //reject => reject
            return $q(function (resolve, reject) {
                if (foto._id) {

                    recursoFoto.update({ fotoId: foto._id }, foto, function () {
                        resolve({
                            mensagem: "Foto " + foto.titulo + " atualizada com sucesso",
                            inclusao: false
                        })
                    }, function (err) {
                        console.log(err)
                        reject({
                            mensagem: "Não foi possivel alterar a foto " + foto.titulo
                        });
                    })
                } else {
                    recursoFoto.save(foto, function () {
                        //IMPORTANTE: não podemos passar veriaveis comuns no ANGULAR: apenas OBJETOS => ai coloca tudo dentro de objetos
                        resolve({
                            mensagem: "Foto " + foto.titulo + " incluida com sucesso",
                            inclusao: true
                        })
                    }, function (err) {
                        console.log(err)
                        reject({
                            mensagem: "Não foi possivel adicionar a foto " + foto.titulo
                        });
                    })
                }
            })
        };

        return servico;

    })