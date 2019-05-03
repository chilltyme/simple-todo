$(document).ready(function () {
    var newItem;
    var doneBtn;
    setTimeout(function () { //This is just to demonstrate the loader working; Needs to be removed after migration
        $("#newtaskbtn").click(function () {
            addListItem();
            $("tbody").append(newItem);

            doneBtn = $("button:contains('Done')");
            doneBtn.click(function (e) {
                e.preventDefault();
                var textArea = $(this).parent().prev().children(":first-child");
                enterTask(textArea);
            });

            cancelBtn = $("button:contains('Cancel')");
            cancelBtn.off("click").click(function () {
                console.log("Click Cncl");
                $(this).closest("tr").remove();
                updateRows();
            });
        });

        function enterTask(thisObj) {
            console.log(thisObj.prop('nodeName') + " This is the element name outside conditionals");
            if ((thisObj.val() != "") && (thisObj.prop('nodeName') == 'TEXTAREA')) { //lol
                console.log(thisObj.prop('nodeName') + " This is the element name");
                thisObj.replaceWith("<p>" + thisObj.val() + "</p>");
                console.log("Value of thisObj: " + thisObj.val());
                $('#alertWarnTask').addClass("alert-success");
                $('#alertWarnTask').removeClass('alert-warning');
                $('#alertText').text("Task created successfully!");
                $("#alertWarnTask").show();
                $(".close").click(function () {
                    $("#alertWarnTask").hide();
                });
            } else if ((thisObj.val() == "") && (thisObj.prop('nodeName') == 'TEXTAREA')) {
                console.log(thisObj.val() + " This is the element val in else if");
               $("#alertWarnTask").css("display", "block");
                $(".close").click(function () {
                    $("#alertWarnTask").hide();
                });
            }
        }

        function addListItem() {
            var rows = getRows();
            console.log(rows + " number of rows lmao");
            newItem = `<tr>
                        <th scope="row">`+ (rows + 1) + `</th>
                        <td>
                            <textarea class="form-control" rows="2" cols="12" placeholder="yo insert text here..."></textarea>
                        </td>
                        <td>
                            <button type="button" class="btn btn-success" style="margin-right:1rem;">Done</button>
                            <button type="button" class="btn btn-danger" >Cancel</button>
                        </td>
                    </tr>`
            return newItem;
        }

        function getRows() {
            var rowTable = $("tbody").children().length;
            return rowTable;
        }

        function updateRows() {
           $("tbody th").each(function(index, element){ //This is also cycling through the element at the same way
               $(element).text(index+1);
           });
        } //Going to take some time learning this but I will get it eventually, the loop

        $("#loader").hide();

        $(".waitforload").show();
    }, 1000);
});



//Add form on button in the list
//Make it be on mySQL
//Have Google/Social Media sign-in
//In the future have accounts on the site in built