<?php

    require '../model/database.php';

    if ( !empty($_POST)) {

        $content = strip_tags($_POST['content']);
        $date = $_POST['time'];
        $vexationid = $_POST['vexationid'];
        // validate input
        $valid = true;
        if (empty($content)) {
            $valid = false;
        }

        if (empty($date)) {
            $valid = false;
        }

        if (empty($vexationid)) {
            $valid = false;
        }

        // insert data
        if ($valid) {
            $pdo = Database::connect();
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO comments (content,date,vexationid) values(?, ?, ?)";
            $q = $pdo->prepare($sql);
            $q->execute(array($content,$date,$vexationid));

            // update vextations
            $sql = "UPDATE vexations SET comments = comments + 1 WHERE id = ? ";
            $q = $pdo->prepare($sql);
            $q->execute(array($vexationid));
            Database::disconnect();
            echo "true";
        }
    }
?>