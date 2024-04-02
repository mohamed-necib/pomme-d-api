<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

require_once './vendor/autoload.php';
session_start();

use App\Route\Router;
use App\Controller\AuthenticationController;
use App\Controller\DailyController;
use App\Controller\FavoriteController;

//On créé une variable d'environnement pour le chemin de base du projet (1ère méthode)
// $_ENV['BASE_DIR'] = '/' . (explode('/', __DIR__))[count(explode('/', __DIR__)) - 1];

//On créé une variable d'environnement pour le chemin de base du projet (2ème méthode)(la plus mieux)
$_ENV['BASE_DIR'] = substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/'));


//On vérifie si la variable url existe

if (!isset($_GET['url'])) {
    $_GET['url'] = '/';
}
$router = new Router($_GET['url']);


$router->get('/', function () {
});

// Routes pour la Connexion/Inscription

//Connexion
$router->get('/login', function () {
    require_once 'src/View/login.php';
});
$router->post(
    '/login',
    function () {
        $auth = new AuthenticationController();
        $result = $auth->login($_POST['pseudo'], $_POST['password']);
        echo json_encode($result);
    }
);


//============================> INSCRIPTION
$router->get('/register', function () {
    require_once 'src/View/register.php';
});
$router->post('/register', function () {
    $auth = new AuthenticationController();
    $result = $auth->register($_POST['pseudo'], $_POST['password'], $_POST['confirmPassword']);

    echo json_encode($result);


    // var_dump($_POST);
});

//============================> DECONNEXION
$router->get('/logout', function () {
    $auth = new AuthenticationController();

    $res = $auth->logout();
    echo json_encode($res);
});


//============================> Favorites
$router->get('/favorites', function () {
    $auth = new AuthenticationController();
    if (!$auth->isConnected()) {
        $res = [
            'success' => false,
            'message' => 'Vous devez être connecté pour accéder à vos favoris'
        ];
        echo json_encode($res);
    } else {
        $fav = new FavoriteController();
        $favorites = $fav->getFavorites();
        echo json_encode($favorites);
    }
});

$router->post('/favorites/add', function () {
    $auth = new AuthenticationController();
    if (!$auth->isConnected()) {
        $res = [
            'success' => false,
            'message' => 'Vous devez être connecté pour ajouter une recette à vos favoris'
        ];
        echo json_encode($res);
    } else {
        $fav = new FavoriteController();
        $result = $fav->add($_POST['id']);
        echo json_encode($result);
    }
});

$router->post('/favorites/remove', function () {
    $auth = new AuthenticationController();
    if (!$auth->isConnected()) {
        $res = [
            'success' => false,
            'message' => 'Vous devez être connecté pour retirer une recette de vos favoris'
        ];
        echo json_encode($res);
    } else {
        $fav = new FavoriteController();
        $result = $fav->remove($_POST['id']);
        echo json_encode($result);
    }
});

//============================> Daily
$router->get('/daily', function () {
    $auth = new AuthenticationController();
    if (!$auth->isConnected()) {
        $res = [
            'success' => false,
            'message' => 'Vous devez être connecté pour accéder à votre consommation du jour'
        ];
        echo json_encode($res);
    } else {
        $daily = new DailyController();
        $dailys = $daily->getDailys();
        echo json_encode($dailys);
    }
});

$router->post('/daily/add', function () {
    $auth = new AuthenticationController();
    if (!$auth->isConnected()) {
        $res = [
            'success' => false,
            'message' => 'Vous devez être connecté pour ajouter un produit à votre consommation du jour'
        ];
        echo json_encode($res);
    } else {
        $daily = new DailyController();
        $result = $daily->add($_POST['id']);
        echo json_encode($result);
    }
});

$router->post('/daily/remove', function () {
    $auth = new AuthenticationController();
    if (!$auth->isConnected()) {
        $res = [
            'success' => false,
            'message' => 'Vous devez être connecté pour retirer un produit de votre consommation du jour'
        ];
        echo json_encode($res);
    } else {
        $daily = new DailyController();
        $result = $daily->remove($_POST['id']);
        echo json_encode($result);
    }
});





//============================> PROFIL
$router->get('/profile', function () {

    $auth = new AuthenticationController();
    if (!$auth->isConnected()) {
        $message = "Vous n'êtes pas connecté vous allez être redirigé vers la page de connexion";
        header("refresh:3;url=/pwd/login");
    } else {
        $user = $_SESSION['user'];
    }

    require_once 'src/View/profile.php';
});
$router->post('/profile', function () {
    $auth = new AuthenticationController();


    if (isset($_POST['info'])) {

        $result = $auth->update($_POST['email'], $_POST['password'], $_POST['fullname']);
        $user = $_SESSION['user'];
    }
    if (isset($_POST['modifPassword'])) {
        $result = $auth->updatePassword($_POST['oldPassword'], $_POST['newPassword'], $_POST['confirmPassword']);
        $user = $_SESSION['user'];
    }
    require_once 'src/View/profile.php';
});
















$router->run();
