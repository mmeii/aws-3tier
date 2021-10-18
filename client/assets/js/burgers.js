//wait to attach handlers until DOM is fully loaded
$(function () {
    //function on click, change burger state to devoured_burger
    //console.log("inside burgers.js");
    $(".devoure-burger").on("click", function (event) {
        let id = $(this).data("id");
        let newState = $(this).data("newstate");

        let newBurgerState = {
            devoured: true
        };

        // send the PUT request
        console.log("Sending PUT request");
        console.log("changed state to", newState);
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newBurgerState
        }).then(() => {
            console.log("changed state to", newState);
            //reload the page to get the updated list
            location.reload();
        })
    })

    $("#addBurgerForm").on("submit", (event) => {
        //preventDefault on a submit event
        event.preventDefault();

        let newBurger = {
            burger_name: $("#add-burger").val().trim()
        };

        //send the POST request
        console.log("send POST request");
        console.log("created new burger");
        $.ajax("/api/burgers/", {
            type: "POST",
            data: newBurger
        }).then(() => {
            console.log("created new burger");
            //reload the page for updated list
            location.reload();
        })
    });

    $(".delete-burger").on("click", function (event) {
        let id = $(this).data("id");

        //send DELETE request
        console.log("send DELETE request");
        console.log("deleted burger", id);
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(() => {
            console.log("deleted burger", id);
            //reload the page to get the updated list
            location.reload();
        });
    });
})