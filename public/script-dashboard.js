function copyCode() {
    var copied = document.getElementById("copied");
    var copyText = document.getElementById("referralCode");
    copyText.select();
    document.execCommand("Copy");
    copied.innerHTML = "Copied!";
}