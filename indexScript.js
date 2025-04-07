function direct_to_book_info() {
    var inpVal = document.getElementById("connect_with_button").value;
    
    if (!isNaN(inpVal) && inpVal.trim() !== "" && inpVal > 0) {
        window.location.href = "books_details.html?books=" + inpVal;
    } else {
        alert("Please enter a valid non-zero number.");
    }
}