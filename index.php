<?php

if (!isset($_SESSION['login'])){
    $_SESSION['login'] = true;
    header("Location: login.php");
    exit();
}else {
    header("Location: menu.php");
    exit();
}
?>
