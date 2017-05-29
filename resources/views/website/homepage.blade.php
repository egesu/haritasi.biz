@extends('website.layout')

@section('content')
    <div class="home-content" ng-controller="HomeController as home">
        <leaflet id="map-marker" markers="home.markers" height="100%" width="100%"></leaflet>
    </div>
@endsection
