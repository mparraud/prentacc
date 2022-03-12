<?php

$frm_name  = "Zorgo"; // from name
$recepient = "example@example.com"; // there should be your email address
$sitename  = "Responsive HTML Template";


$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$message = trim($_POST["textarea"]);
$subject = trim($_POST["subject"]);

if (empty($subject)) {
    $subject = "Zorgo message";
}

$send_message = "<div style='font-size: 16px;'>
<br>
<b>Name:</b> $name <br><br>
<b>Email:</b> $email <br><br>
<b>Message:</b> $message
<br>
</div>";

mail($recepient, $subject, $send_message, "From: $frm_name <$email>" . "\r\n" . "Reply-To: $email" . "\r\n" . "X-Mailer: PHP/" . phpversion() . "\r\n" . "Content-type: text/html; charset=\"utf-8\"");
