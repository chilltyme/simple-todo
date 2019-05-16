$(document).ready(function () {
    var newItem;
    var doneBtn;
    var editBtn;

    setTimeout(function () { //This is just to demonstrate the loader working; Needs to be removed after migration
        $("#newtaskbtn").click(function () {
            addListItem();
            $("tbody").append(newItem);

            editBtn = `<button type="button" class="btn btn-info" style="margin-right:1rem;">Edit</button>`;

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

        $("tbody").on('click', $("button:contains('Edit')"), function () {
            $("button:contains('Edit')").off("click").click(function () {
                wowza = $(this).parent().prev().children(":first-child").text();
                $(this).parent().prev().children(":first-child").replaceWith('<textarea class="form-control" rows="2" cols="12">' + wowza + '</textarea>');
                $(this).hide();
            });
        });

        function enterTask(thisObj) {
            if ((thisObj.val() != "") && (thisObj.prop('nodeName') == 'TEXTAREA')) { //lol
                
                //AJAX 
                $.ajax({
                    url: '/',
                    dataType: 'text',
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({taskInput : thisObj.val()}),
                    success: function(data, textStatus, jQxhr){
                        console.log("This is data: "+ data + " <--");
                        console.log("This is textStatus: " + textStatus + " <---");
                    },
                    error: function(jQxhr, textStatus, errorThrown){
                        console.log("This is error: "+ errorThrown + " <---");
                    }

                });


                currentDoneBtn = thisObj.parent().next().children(":first-child");
                thisObj.replaceWith("<div class=container><div class=row><div class='col-sm-9'><p class='panel-body'>" + thisObj.val() + "</p></div></div></div>");
                console.log("Value of thisObj: " + thisObj.val());

                $('#alertWarnTask').addClass("alert-success");
                $('#alertWarnTask').removeClass('alert-warning');
                $('#alertText').text("Task created successfully!");
                $("#alertWarnTask").show();

                delBtn = currentDoneBtn.next().text('Delete');
                currentDoneBtn.after(editBtn);

                $(".close").click(function () {
                    $("#alertWarnTask").hide();
                    $('#alertText').text("You have not entered anything in the input area!");
                    $('#alertWarnTask').addClass("alert-warning");
                    $('#alertWarnTask').removeClass('alert-success');
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
            $("tbody th").each(function (index, element) { //This is also cycling through the element at the same way
                $(element).text(index + 1);
            });
        } //Going to take some time learning this but I will get it eventually, the loop

        $("#loader").hide();

        $(".waitforload").show();
    }, 1000);
});



//Add form on button in the list

//Have Google/Social Media sign-in
//Make it so if HTML is entered in the textarea its parsed as plain text and not as HTML.
//Possible solution to HTML parsing problem is send data to SV first then have the SV inject it in as a string. 
//onkeyup="javascript:this.value=this.value.replace(/[<,>]/g,'');" <-- as option in textarea band aid 