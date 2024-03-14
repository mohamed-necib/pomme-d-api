<?php

namespace App\Controller;

use App\Model\User;

class AuthenticationController
{

    public function register($pseudo, $password, $confirmPassword)
    {
        if (isset($pseudo) && isset($password) && isset($confirmPassword)) {
            $pseudo = htmlspecialchars($pseudo);
        } else {
            return [
                'success' => false,
                'message' => 'Veuillez remplir tous les champs'
            ];
        }

        if ($password !== $confirmPassword) {
            return [
                'success' => false,
                'message' => 'Les mots de passe ne correspondent pas'
            ];
        }

        $user = new User();
        $result = $user->findOneByPseudo($pseudo);

        if ($result) {

            return [
                'success' => false,
                'message' => 'Ce pseudo est déjà utilisé'
            ];
        } else {
            $user->setPseudo($pseudo);
            $user->setPassword(password_hash($password, PASSWORD_DEFAULT));
            $user->create();
            return [
                'success' => true,
                'message' => 'Votre compte a bien été créé'
            ];
        }
    }

    public function login($pseudo, $password)
    {
        if (isset($pseudo) && isset($password)) {
            $pseudo = htmlspecialchars($pseudo);
        } else {
            return [
                'success' => false,
                'message' => 'Veuillez remplir tous les champs'
            ];
        }

        $user = new User();
        $result = $user->findOneByPseudo($pseudo);
        if ($result) {
            if (password_verify($password, $result->getPassword())) {
                $_SESSION['user'] = $result;
                return [
                    'success' => true,
                    'message' => 'Vous êtes connecté',
                    'id' => $result->getId(),
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Les identifiants fournis ne correspondent à aucun utilisateurs'
                ];
            }
        } else {
            return [
                'success' => false,
                'message' => 'Les identifiants fournis ne correspondent à aucun utilisateurs'
            ];
        }
    }

    public function isConnected()
    {
        if (!isset($_SESSION['user'])) {
            return false;
        } else {
            return true;
        }
    }

    public function update($pseudo, $password)
    {
        if (isset($pseudo) && isset($password)) {
            $pseudo = htmlspecialchars($pseudo);
        } else {
            return [
                'success' => false,
                'messageInfo' => 'Veuillez remplir tous les champs'
            ];
        }

        $user = new User($_SESSION['user']->getId(), $_SESSION['user']->getPseudo(), $_SESSION['user']->getPassword());

        if ($pseudo === $_SESSION['user']->getPseudo()) {
            if (password_verify($password, $_SESSION['user']->getPassword())) {
                $user->setPseudo($pseudo);
                $user->update();
                $_SESSION['user'] = $user;
                return [
                    'success' => true,
                    'messageInfo' => 'Votre compte a bien été modifié'
                ];
            } else {

                return [
                    'success' => false,
                    'messageInfo' => 'Les identifiants fournis ne correspondent à aucun utilisateurs'
                ];
            }
        } else {
            $result = $user->findOneByPseudo($pseudo);
            if ($result) {
                return [
                    'success' => false,
                    'messageInfo' => 'Cet email est déjà utilisé'
                ];
            } else {

                if (password_verify($password, $_SESSION['user']->getPassword())) {
                    $user->setPseudo($pseudo);
                    $user->update();
                    $_SESSION['user'] = $user;
                    return [
                        'success' => true,
                        'messageInfo' => 'Votre compte a bien été modifié'
                    ];
                } else {
                    return [
                        'success' => false,
                        'messageInfo' => 'Les identifiants fournis ne correspondent à aucun utilisateurs ici'
                    ];
                }
            }
        }
    }

    public function updatePassword($old, $new, $confirmNew)
    {
        if (isset($old) && isset($new) && isset($confirmNew)) {
        } else {
            return [
                'success' => false,
                'message' => 'Veuillez remplir tous les champs'
            ];
        }

        if ($new !== $confirmNew) {
            return [
                'success' => false,
                'message' => 'Les mots de passe ne correspondent pas'
            ];
        }

        if (password_verify($old, $_SESSION['user']->getPassword())) {
            $user = new User($_SESSION['user']->getId(), $_SESSION['user']->getPseudo(), $_SESSION['user']->getPassword());
            $user->setPassword(password_hash($new, PASSWORD_DEFAULT));
            $user->update();
            $_SESSION['user'] = $user;
            return [
                'success' => true,
                'message' => 'Votre mot de passe a bien été modifié'
            ];
        } else {
            return [
                'success' => false,
                'message' => 'Les identifiants fournis ne correspondent à aucun utilisateurs'
            ];
        }
    }

    public function logout()
    {
        session_destroy();
        return true;
    }
}
