<!doctype html>
<html lang="en" class="wide wow-animation" ng-app="haritasi.admin" ng-strict-di ng-controller="AppController as app">
    <head>
        <!-- Site Title-->
        <title>{{@$siteTitle}}</title>
        <meta name="format-detection" content="telephone=no">
        <meta name="viewport"
              content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta charset="utf-8">
        <link rel="icon" href="/assets/ui/images/favicon.ico" type="image/x-icon">

        <link rel="stylesheet" href="/css/admin.css">
    </head>

    <body>

        <ui-view name="mainView"></ui-view>

        <script>
            window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
            ]); ?>
        </script>
        <script src="/js/admin.js"></script>
    </body>
</html>
