<?php
// poslji_podatke.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Ali navedite točno vašo domeno
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Nastavitve e-pošte
$to = 'tajnistvo@zasrce-mb.si';
$subject_contact = 'Nov kontakt z naše spletne strani';
$subject_membership = 'Nova Pristopna Izjava (Članstvo)';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Ni podatkov.']);
    exit;
}

// Preverimo kateri obrazec je bil poslan
$formType = isset($data['formType']) ? $data['formType'] : 'contact';

if ($formType === 'membership') {
    // Obdelava pristopne izjave
    $ime = htmlspecialchars($data['ime'] ?? '');
    $priimek = htmlspecialchars($data['priimek'] ?? '');
    $datumRojstva = htmlspecialchars($data['datumRojstva'] ?? '');
    $naslov = htmlspecialchars($data['naslov'] ?? '');
    $posta = htmlspecialchars($data['posta'] ?? '');
    $kraj = htmlspecialchars($data['kraj'] ?? '');
    $email = htmlspecialchars($data['email'] ?? '');
    $telefon = htmlspecialchars($data['telefon'] ?? '');

    $message = "Nova pristopna izjava:\n\n";
    $message .= "Ime in priimek: $ime $priimek\n";
    $message .= "Datum rojstva: $datumRojstva\n";
    $message .= "Naslov: $naslov, $posta $kraj\n";
    $message .= "Email: $email\n";
    $message .= "Telefon: $telefon\n";
    
    $headers = "From: webmaster@vasa-domena.si\r\n"; // Spremenite v pošiljatelja z vaše domene
    if ($email) {
        $headers .= "Reply-To: $email\r\n";
    }

    if (mail($to, $subject_membership, $message, $headers)) {
        echo json_encode(['status' => 'success']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Napaka pri pošiljanju.']);
    }

} else {
    // Obdelava navadnega kontaktnega obrazca
    $name = htmlspecialchars($data['name'] ?? '');
    $email = htmlspecialchars($data['email'] ?? '');
    $phone = htmlspecialchars($data['phone'] ?? '');
    $msg = htmlspecialchars($data['message'] ?? '');

    $message = "Novo sporočilo:\n\n";
    $message .= "Ime in priimek: $name\n";
    $message .= "Email: $email\n";
    $message .= "Telefon: $phone\n\n";
    $message .= "Sporočilo:\n$msg\n";

    $headers = "From: webmaster@vasa-domena.si\r\n"; // Spremenite
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject_contact, $message, $headers)) {
        echo json_encode(['status' => 'success']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Napaka pri pošiljanju.']);
    }
}
?>
