<?php

namespace App\Model;

use PDO;
use App\Abstract\Database;

class Daily
{
    private ?PDO $pdo = null;
    public function __construct(
        private ?int $id = null,
        private ?int $user_id = null,
        private ?int $id_product = null,
    ) {
    }

    // Getters and Setters //
    public function getPdo(): \PDO
    {
        $this->pdo = $this->pdo ?? (new Database())->connection();
        return $this->pdo;
    }
    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * Set the value of id
     *
     * @return  self
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }
    /**
     * Get the value of user_id
     */
    public function getUserId()
    {
        return $this->user_id;
    }
    /**
     * Set the value of user_id
     *
     * @return  self
     */
    public function setUserId($user_id)
    {
        $this->user_id = $user_id;
        return $this;
    }
    /**
     * Get the value of id_product
     */
    public function getIdProduct()
    {
        return $this->id_product;
    }
    /**
     * Set the value of id_product
     *
     * @return  self
     */
    public function setIdProduct($id_product)
    {
        $this->id_product = $id_product;
        return $this;
    }

    // mettre la date du jour dans la table daily
    public function create()
    {
        $query = $this->getPdo()->prepare('INSERT INTO `daily` (`user_id`, `id_product`, `date`) VALUES (:user_id, :id_product, DATE(NOW()))');
        $query->execute([
            'user_id' => $this->user_id,
            'id_product' => $this->id_product
        ]);
    }

    // supprimer un produit de la table daily qui a été ajouté à la consommation du jour
    public function delete()
    {
        $query = $this->getPdo()->prepare('DELETE FROM `daily` WHERE `user_id` = :user_id AND `id_product` = :id_product AND `date` = DATE(NOW())');
        $query->execute([
            'user_id' => $this->user_id,
            'id_product' => $this->id_product
        ]);
    }

    // récupérer les produits ajoutés à la consommation du jour
    public function findAllByUserId($user_id): array
    {
        $query = $this->getPdo()->prepare('SELECT * FROM `daily` WHERE `user_id` = :user_id AND `date` = DATE(NOW())');
        $query->execute(['user_id' => $user_id]);
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        $dailys = [];
        foreach ($result as $row) {
            $daily = new Daily();
            $daily->setId($row['id']);
            $daily->setUserId($row['user_id']);
            $daily->setIdProduct($row['id_product']);
            $dailys[] = $daily;
        }
        return $dailys;
    }
}
