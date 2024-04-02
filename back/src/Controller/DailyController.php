<?php

namespace App\Controller;

use App\Model\Daily;

class DailyController
{
    public function add($id)
    {
        $daily = new Daily();
        $daily->setUserId($_SESSION['user']['id']);
        $daily->setIdProduct($id);
        $daily->create();
        return [
            'success' => true,
            'message' => 'produit ajoutée à la consommation du jour'
        ];
    }

    public function remove($id)
    {
        $daily = new Daily();
        $daily->setUserId($_SESSION['user']['id']);
        $daily->setIdProduct($id);
        $daily->delete();
        return [
            'success' => true,
            'message' => 'Produit retirée de la consommation du jour'
        ];
    }

    public function getDailys()
    {
        $daily = new Daily();
        $dailys = $daily->findAllByUserId($_SESSION['user']['id']);
        return $dailys;
    }
}
