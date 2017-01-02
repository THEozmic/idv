<?php

    require '../model/database.php';

    if ( !empty($_POST)) {

        $content = strip_tags($_POST['content']);
        $date = $_POST['time'];

        // validate input
        $valid = true;
        if (empty($content)) {
            $valid = false;
        }

        if (empty($date)) {
            $valid = false;
        }

        // insert data
        if ($valid) {
            $pdo = Database::connect();
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO vexations (content,date) values(?, ?)";
            $q = $pdo->prepare($sql);
            $q->execute(array($content,$date));
            Database::disconnect();
            echo "true";
        }
    }
?>