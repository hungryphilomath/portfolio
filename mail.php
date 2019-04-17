<?php
$to = 'aoabuelgasim@gmail.com';
$name = $_POST['name'];
$from = $_POST['email'];
$message = $_POST['message'];
$subject = 'Message from Website Contact Form';
$body =  "You have received the following message from your website contact form:<br><br>From: $name<br>E-Mail: $from<br>Message:<br>\"$message\"";

$headers = "MIME-Version: 1.0" . "\r\n" . "Content-type:text/html;charset=UTF-8" . "\r\n" . "From: $from" . "\r\n" . "Reply-To: $name <$from>" . "\r\n" . 'X-Mailer: PHP/' . phpversion();

if(mail ($to, $subject, $body, $headers)){
  echo "<h3>Your message has been sent to " . $to . ".</h3><br><h3>Thanks for contacting me, I'll get back to you as soon as possible.</h3>";
}
?>
