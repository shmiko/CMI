
    angular.module('ba3-angularmaterial-googlemaps-location', [])
    .config(iconConfiguration)
    .controller('PrincipalController', ['$scope', '$mdToast', PrincipalController]);

    function iconConfiguration($mdIconProvider) {
        $mdIconProvider.defaultIconSet('icons_24x24.svg', 24);
    }

    function PrincipalController($scope, $mdToast) {
        var mapa;
        var geocoder;

        $scope.view = {
            addressInput: '',
            places: [],
            selectedPlace: '',
            markers: [],
        };
        $scope.buscarDireccion = buscarDireccion;
        $scope.centrarUbicacion = centrarUbicacion;
        $scope.borrarMarcadores = borrarMarcadores;

        InitializeComponents();

        //Inicializa el mapa y otros componentes
        function InitializeComponents() {
            var mapConfig = {
                center: { lat: 13.676445, lng: -89.281736 },
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.HYBRID
            };
            mapa = new google.maps.Map(document.getElementById('map'), mapConfig);
            geocoder = new google.maps.Geocoder();
        }

        //Busca diferentes ubicaciones segun la direccion dada
        function buscarDireccion() {
            if (geocoder !== undefined) {
                geocoder.geocode(
                    { address: $scope.view.addressInput },
                    function (results, status) {
                        $scope.view.places = [];
                        $scope.view.selectedPlace = '';
                        switch (status) {
                            case google.maps.GeocoderStatus.OK:
                                console.log(results);
                                $scope.view.places = results;
                                if (results.length < 2) {
                                    $scope.view.selectedPlace = results[0].place_id;
                                    $scope.view.addressInput = results[0].formatted_address;
                                    centrarUbicacion();
                                } else mostrarMensaje('Se han encontrado ' + $scope.view.places.length + ' ubicaciones');
                                break;
                            case google.maps.GeocoderStatus.ZERO_RESULTS:
                                mostrarMensaje('No se han encontrado resultados');
                                break;
                            case google.maps.GeocoderStatus.REQUEST_DENIED:
                                mostrarMensaje('La solicitud de búsqueda ha sido denegada');
                                break;
                            case google.maps.GeocoderStatus.INVALID_REQUEST:
                                mostrarMensaje('Solicitud inválida');
                                break;
                        }
                        $scope.$apply();
                    }
                );
            }
        }

        //Posiciona en el centro de la vista del mapa la ubicacion seleccionada
        function centrarUbicacion() {
            if ($scope.view.selectedPlace !== undefined & $scope.view.selectedPlace !== '') {
                var location = _.result(_.find($scope.view.places, function (x) { return x.place_id === $scope.view.selectedPlace; }), 'geometry.location');
                if (location !== undefined) {
                    var marker = new google.maps.Marker({ position: location, map: mapa });
                    $scope.view.markers.push(marker);
                    mapa.setCenter(location);
                }
                else {
                    mostrarMensaje('No se pudo mostrar la ubicación');
                }
            }
        }

        //Borra los marcadores del mapa
        function borrarMarcadores() {
            for (var i = 0; i < $scope.view.markers.length; i++) {
                $scope.view.markers[i].setMap(null);
            }
            $scope.view.markers = [];
        }

        //Muestra un mensaje toast (funcion base)
        function simpleToastBase(message, position, delay, action) {
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position(position)
                    .hideDelay(delay)
                    .action(action)
            );
        }

        //Muestra un mensaje toast
        function mostrarMensaje(mensaje) {
            simpleToastBase(mensaje, 'top right', 6000, 'X');
        }
    };