<?php
include "conexao.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $endereco = $_POST['endereco'];
    $destino = $_POST['destino'];
    $numero_viajantes = $_POST['numero_viajantes'];
    $data_chegada = $_POST['data_chegada'];
    $data_partida = $_POST['data_partida'];

    $sql = "INSERT INTO reservas_viagem 
            (nome, email, telefone, endereco, destino, numero_viajantes, data_chegada, data_partida)
            VALUES 
            (:nome, :email, :telefone, :endereco, :destino, :numero_viajantes, :data_chegada, :data_partida)";

    $stmt = $conn->prepare($sql);

    $stmt->bindParam(":nome", $nome);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":telefone", $telefone);
    $stmt->bindParam(":endereco", $endereco);
    $stmt->bindParam(":destino", $destino);
    $stmt->bindParam(":numero_viajantes", $numero_viajantes);
    $stmt->bindParam(":data_chegada", $data_chegada);
    $stmt->bindParam(":data_partida", $data_partida);

    if ($stmt->execute()) {
        echo "Reserva realizada com sucesso!";
    } else {
        echo "Erro ao realizar a reserva.";
    }
}
