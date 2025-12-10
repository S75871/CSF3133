document.addEventListener("DOMContentLoaded", function () {
    // Select ALL elements with the class 'collapsible'
    const collapsibleButtons = document.querySelectorAll(".collapsible");
    
    // Loop through each button and attach the click listener
    collapsibleButtons.forEach(button => {
        button.addEventListener("click", function () {
            // 'this' refers to the button that was clicked
            
            // Toggle an 'active-btn' class on the button itself (for styling)
            this.classList.toggle("active-btn"); 

            // Find the immediate next sibling element (the '.content' div)
            const content = this.nextElementSibling;
            
            // Toggle the 'active' class on the content
            // The CSS transition handles the rest (max-height 0 to max-height 500px)
            content.classList.toggle("active");
            
        });
    });
});