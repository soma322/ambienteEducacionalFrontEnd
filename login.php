<?php
require_once('controlador/ctl_login.php');
session_start();

login();


?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Ambiente Educativo - Login</title>

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <!-- Custom styles for this template-->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

</head>

<body class="bg-gradient-primary">

    <div class="container">

        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Login </h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                id="usuario" aria-describedby="emailHelp"
                                                placeholder="Usuario">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                id="contra" placeholder="Contraseña">
                                        </div>
                                        <div class="form-group">
                                          
                                        </div>
                                        <a onclick="login()" class="btn btn-primary btn-user btn-block">
                                            Login
                                        </a>
                                        <hr>
                                        <p id="demo"></p>
                                    </form>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
    <script type="text/javascript" src="js/variables/env.js">  </script>
    <script src="js/ctl/login/jsFuncionesLogin.js" type="text/javascript"></script>
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <script src="js/sb-admin-2.min.js"></script>

</body>

<form id="formpost" method="post" action="/menu.php">
    <input type="hidden" id="nombre" name="nombre"><br>
    <input type="hidden" id="nombrepaterno" name="nombrepaterno"><br>
    <input type="hidden" id="nombrematerno" name="nombrematerno"><br>
  <input type="hidden" id="privilegio" name="privilegio"><br>
  <input type="hidden" id="rol" name="rol">
  <input type="hidden" id="descripcion" name="descripcion">
  <input type="hidden" id="id" name="id">
  <input type="hidden" id="token" name="token" value="<?php echo $_SESSION['token'] ?? '' ?>">
</form>
</html>