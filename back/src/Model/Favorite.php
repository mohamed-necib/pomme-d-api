<?php

namespace App\Model;

use PDO;
use App\Abstract\Database;

class Favorite
{
    private ?PDO $pdo = null;
    public function __construct(
        private ?int $id = null,
        private ?int $user_id = null,
        private ?int $product_code = null,
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
     * Get the value of product_code
     */
    public function getProductCode()
    {
        return $this->product_code;
    }
    /**
     * Set the value of product_code
     *
     * @return  self
     */
    public function setProductCode($product_code)
    {
        $this->product_code = $product_code;
        return $this;
    }

    public function create()
    {
        $query = $this->getPdo()->prepare('INSERT INTO favoris (user_id, product_code) VALUES (:user_id, :product_code)');
        $query->execute([
            'user_id' => $this->getUserId(),
            'product_code' => $this->getProductCode()
        ]);
    }

    public function delete()
    {
        $query = $this->getPdo()->prepare('DELETE FROM favoris WHERE user_id = :user_id AND product_code = :product_code');
        $query->execute([
            'user_id' => $this->getUserId(),
            'product_code' => $this->getProductCode()
        ]);
    }

    public function findAllByUserId($user_id)
    {
        $query = $this->getPdo()->prepare('SELECT * FROM favoris WHERE user_id = :user_id');
        $query->execute([
            'user_id' => $user_id
        ]);
        return $query->fetchAll();
    }
}
