<?php
function getLanguage($lang)
{
    $text = [];
    switch ($lang) {
        case 'en':
            $text = [
                'welcome' => 'Welcome to our website!',
                'about' => 'About Us',
                'contact' => 'Contact Us'
            ];
            break;
        case 'th':
            $text = [
                'welcome' => 'ยินดีต้อนรับสู่เว็บไซต์ของเรา!',
                'about' => 'เกี่ยวกับเรา',
                'contact' => 'ติดต่อเรา'
            ];
            break;
        default:
            $text = [
                'welcome' => 'Welcome to our website!',
                'about' => 'About Us',
                'contact' => 'Contact Us'
            ];
            break;
    }
    return $text;
}
