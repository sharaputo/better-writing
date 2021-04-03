<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->IsHTML(true);

$mail->setFrom('better-writing@gmail.com', 'Better writing');
$mail->addAddress('sharaputo@icloud.com');
$mail->Subject = 'New email form Better Writing';

$body = '<h1>User Contact Details</h1>';

if(trim(!empty($_POST['contact_name']))){
  $body .= '<p><strong>Name:</strong> '.$_POST['contact_name'].'</p>';
}
$honeypot = trim($_POST['contact_surname']);
if(!empty($honeypot)) {
  echo 'Spam!';
  exit;
}
if(trim(!empty($_POST['contact_email']))){
  $body .= '<p><strong>Email:</strong> '.$_POST['contact_email'].'</p>';
}
if(trim(!empty($_POST['phone']))){
  $body .= '<p><strong>Phone:</strong> '.$_POST['contact_phone'].'</p>';
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