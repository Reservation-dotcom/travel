<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond($status, $payload) {
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'message' => 'Method not allowed.']);
}

$recipientEmail = 'rabiajabreel@gmail.com';
$senderEmail = 'website@schengenmasters.co.uk';

if ($recipientEmail === 'REPLACE_WITH_YOUR_INBOX@example.com'
    || !filter_var($recipientEmail, FILTER_VALIDATE_EMAIL)
    || !filter_var($senderEmail, FILTER_VALIDATE_EMAIL)) {
    respond(500, ['success' => false, 'message' => 'The enquiry email addresses are not configured.']);
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    respond(400, ['success' => false, 'message' => 'Invalid form data.']);
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$phone = trim((string) ($data['phone'] ?? ''));
$passengers = trim((string) ($data['passengers'] ?? ''));
$travelDate = trim((string) ($data['travelDate'] ?? ''));
$numberOfDays = trim((string) ($data['numberOfDays'] ?? ''));
$enquiryFrom = trim((string) ($data['enquiryFrom'] ?? 'Travel Enquiry'));

if ($name === '' || $email === '' || $phone === '') {
    respond(400, ['success' => false, 'message' => 'Name, email, and phone are required.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['success' => false, 'message' => 'Please enter a valid email address.']);
}

foreach ([$name, $email, $phone, $passengers, $travelDate, $numberOfDays, $enquiryFrom] as $value) {
    if (strlen($value) > 500) {
        respond(400, ['success' => false, 'message' => 'One or more fields are too long.']);
    }
}

$escape = function ($value) {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
};

$fields = [
    'Enquiry from' => $enquiryFrom,
    'Name' => $name,
    'Email' => $email,
    'Phone' => $phone,
    'Passengers' => $passengers !== '' ? $passengers : 'Not specified',
    'Travel date' => $travelDate !== '' ? $travelDate : 'Not specified',
    'Number of days' => $numberOfDays !== '' ? $numberOfDays . ' days' : 'Not specified',
];

$rows = '';
foreach ($fields as $label => $value) {
    $rows .= '<tr><th style="padding:10px;text-align:left;border-bottom:1px solid #ddd">'
        . $escape($label)
        . '</th><td style="padding:10px;border-bottom:1px solid #ddd">'
        . $escape($value)
        . '</td></tr>';
}

$message = '<!doctype html><html><body><h2>New travel enquiry</h2>'
    . '<table style="border-collapse:collapse;width:100%">' . $rows . '</table>'
    . '</body></html>';
$headers = [
    'From: Schengen Masters <' . $senderEmail . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
];

if (!mail($recipientEmail, 'New travel website enquiry', $message, implode("\r\n", $headers))) {
    respond(500, ['success' => false, 'message' => 'The server could not send the enquiry email.']);
}

respond(200, ['success' => true, 'message' => 'Enquiry email sent successfully.']);