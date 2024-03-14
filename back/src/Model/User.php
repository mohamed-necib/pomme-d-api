<?php

namespace App\Model;

use PDO;
use App\Abstract\Database;


class User
{
  private ?PDO $pdo = null;
  public function __construct(
    private ?int $id = null,
    private ?string $pseudo = null,
    private ?string $password = null,


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
   * Get the value of password
   */
  public function getPassword()
  {
    return $this->password;
  }
  /**
   * Set the value of password
   *
   * @return  self
   */
  public function setPassword($password)
  {
    $this->password = $password;
    return $this;
  }

  /**
   * Get the value of pseudo
   */
  public function getPseudo()
  {
    return $this->pseudo;
  }

  /**
   * Set the value of pseudo
   *
   * @return  self
   */
  public function setPseudo($pseudo)
  {
    $this->pseudo = $pseudo;

    return $this;
  }


  // Methods //
  public function findOneById(int $id): ?User
  {
    $sql = "SELECT * FROM user WHERE id = :id";
    $pdo = $this->getPdo();
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result === false) {
      return null;
    } else {
      $user = new User();
      $user->setId($result['id']);
      $user->setPseudo($result['pseudo']);
      $user->setPassword($result['password']);
      return $user;
    }
  }

  public function findAll(): array
  {
    $sql = "SELECT * FROM user";
    $pdo = $this->getPdo();
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $users = [];
    foreach ($result as $row) {
      $user = new User();
      $user->setId($row['id']);
      $user->setPseudo($row['pseudo']);
      $users[] = $user;
    }
    return $users;
  }

  //REGISTER FUNCTION
  public function create(): User|bool
  {
    $sql = "INSERT INTO user (pseudo, password) VALUES (:pseudo, :password)";
    $pdo = $this->getPdo();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
      'pseudo' => $this->pseudo,
      'password' => $this->password,
    ]);
    $count = $stmt->rowCount();
    if ($count > 0) {
      return true;
    } else {
      return false;
    }
  }

  //UPDATE FUNCTION
  public function update(): User|bool
  {
    $sql = "UPDATE user SET pseudo = :pseudo, password = :password WHERE id = :id";
    $pdo = $this->getPdo();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
      'pseudo' => $this->pseudo,
      'password' => $this->password,
      'id' => $this->id
    ]);
    $count = $stmt->rowCount();
    if ($count > 0) {
      return true;
    } else {
      return false;
    }
  }

  public function findOneByPseudo($pseudo): User|false
  {
    $sql = "SELECT * FROM user WHERE pseudo = :pseudo";
    $pdo = $this->getPdo();
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['pseudo' => $pseudo]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result === false) {
      return $result;
    } else {
      $user = new User();
      $user->setId($result['id']);
      $user->setPseudo($result['pseudo']);
      $user->setPassword($result['password']);
      return $user;
    }
  }

  public function __sleep()
  {
    return ['id', 'pseudo', 'password'];
  }

  public function __wakeup()
  {
    $this->pdo = null;
  }
}
