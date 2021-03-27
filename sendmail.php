<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->IsHTML(true);

$mail->setFrom('info@safisa.shop', 'Safisa website');
$mail->addAddress('sharaputo@icloud.com');
$mail->Subject = 'New email form Safisa website';

$body = '<h1>User Contact Details</h1>';

if(trim(!empty($_POST['name']))){
  $body .= '<p><strong>Name:</strong> '.$_POST['name'].'</p>';
}
$honeypot = trim($_POST["surname"]);
if(!empty($honeypot)) {
  echo "Spam!";
  exit;
}
if(trim(!empty($_POST['phone']))){
  $body .= '<p><strong>Phone:</strong> '.$_POST['phone'].'</p>';
}
if(trim(!empty($_POST['email']))){
  $body .= '<p><strong>Email:</strong> '.$_POST['email'].'</p>';
}

$mail->Body = $body;

if (!$mail->send()) {
  $message = 'Error!';
} else {
  $message = 'Success!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>