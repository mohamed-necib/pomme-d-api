<?php

namespace App\Controller;

use App\Model\Favorite;

class FavoriteController
{
    public function add($id, $user_id)
    {
        $favorite = new Favorite();
        $favorite->setUserId($user_id);
        $favorite->setProductCode($id);
        $favorite->create();
        return [
            'success' => true,
            'message' => 'Recette ajoutée aux favoris'
        ];
    }

    public function remove($id)
    {
        $favorite = new Favorite();
        $favorite->setUserId($_SESSION['user']['id']);
        $favorite->setProductCode($id);
        $favorite->delete();
        return [
            'success' => true,
            'message' => 'Recette retirée des favoris'
        ];
    }

    public function getFavorites()
    {
        $favorite = new Favorite();
        $favorites = $favorite->findAllByUserId($_SESSION['user']['id']);
        return $favorites;
    }
}
