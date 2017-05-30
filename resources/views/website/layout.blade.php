<!doctype html>
<html lang="en" class="wide wow-animation" ng-app="haritasi.web" ng-controller="AppController as app" ng-strict-di>
    <head>
        <!-- Site Title-->
        <title>{{@$siteTitle}}</title>
        <meta name="format-detection" content="telephone=no">
        <meta name="viewport"
              content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta charset="utf-8">
        <link rel="icon" href="/assets/ui/images/favicon.ico" type="image/x-icon">
        <!-- <link rel="stylesheet" href="/assets/ui/css/style.css">
        <link rel="stylesheet" href="/assets/ui/css/calendar.css">
        <link rel="stylesheet" href="/assets/ui/css/calendar_full.css">
        <link rel="stylesheet" href="/assets/ui/css/calendar_compact.css">
        <link rel="stylesheet" href="/assets/ui/css/fonts.css">
        <link rel="stylesheet" href="/assets/ui/css/app.css">
        <meta name="twitter:card" content="summary_large_image"> -->

        <link rel="stylesheet" href="/css/app.css">

        <!-- <meta name="twitter:site" content="@ekmekvegul">
        <meta name="twitter:creator" content="@ekmekvegul"/> -->
        @if(!empty($siteDescription))
            <meta name="description" content="{{$siteDescription}}">
            <meta itemprop="description" content="{{$siteDescription}}"/>
            <meta name="twitter:description" content="{{$siteDescription}}">
        @endif
        @if(!empty($og['title']))
            <meta property="og:title" content="{{$og['title']}}"/>
            <meta itemprop="name" content="{{$og['title']}}"/>
            <meta name="twitter:title" content="{{$og['title']}}">
        @endif
        @if(!empty($og['url']))
            <meta property="og:url" content="{{$og['url']}}"/>
            <meta itemprop="url" content="{{$og['url']}}">
            <meta name="twitter:url" content="{{$og['url']}}">
        @endif
        @if(!empty($og['image']))
            @foreach($og['image'] as $ogImage)
                <meta property="og:image" content="{{$ogImage}}"/>
                <meta itemprop="image" content="{{$ogImage}}"/>
                <meta name="twitter:image" content="{{$ogImage}}">
            @endforeach
        @endif
        <script type="text/javascript">
          window.title = '{{$og['title'] ?? $siteTitle ?? ''}}';
          @if(!empty($og['image'][0]))
          window.image = '{{$og['image'][0]}}';
          @endif
        </script>
        @if(!empty($og['type']))
            <meta property="og:type" content="{{$og['type']}}"/>
        @endif
        @if(!empty($og['locale']))
            <meta property="og:locale" content="{{$og['locale']}}"/>
        @endif
        @if(!empty($og['video']))
            <meta property="og:video" content="{{$og['video']}}"/>
        @endif
        <meta itemprop="genre" value="news">
        <meta itemprop="inLanguage" content="tr-TR"/>
        <meta property="og:site_name" content="haritasi.biz">
    </head>

    <body>

        <ui-view name="mainView"></ui-view>

        <script>
            window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
            ]); ?>
        </script>
        <script src="/js/manifest.js"></script>
        <script src="/js/vendor.js"></script>
        <script src="/js/app.js"></script>
    </body>
</html>
