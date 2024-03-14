<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

require_once './vendor/autoload.php';
session_start();

use App\Route\Router;
use App\Controller\AuthenticationController;

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

    if (!$auth->isConnected()) {
        echo json_encode([
            'success' => false,
            'message' => 'Vous n\'êtes pas connecté'
        ]);
    } else {
        $res = $auth->logout();
        echo json_encode($res);
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
