function getInfo() {
    if (document.getElementById('tag').value) {
        var tag = document.getElementById('tag').value;
        var url =`https://api.tvmaze.com/singlesearch/shows?q=${tag}`;

        $.ajax({url:url, dataType:"json"}).then(data => {
            // console.log("data 1", data);
            data.summary = data.summary.replace(/'/g, '');
            data.summary = data.summary.replace(/"/g, '');
            var cardImageInfo = document.createElement("div");
            cardImageInfo.innerHTML = ` <div class="row" id="Row1">
            <div class="col" id="picDiv">
            <img src = " ${data.image.medium} " style= "height=75% width=50%"></img>
            </div> 
            <div class="col">
            <h1> ${data.name} </h1>
            <h3> <b> Premier Date:</b> ${data.premiered} </h3>
            <p> <b>Status:</b> ${data.status} </p> 
            <p> <b>Language:</b> ${data.language} </p> 
            <p> <b>Summary:</b> ${data.summary} </p>
            </div>
            </div>
            <div class="row" id="Row2">
            <div class="col">
            </div>
            <div class="col">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Add Search Result</button>
            </div>
            </div>
            <div id="myModal" class="modal fade">
      <div class="modal-dialog modal-login">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Would you like to add this result?</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <button
                id="my_submit_button"
                class="btn btn-primary btn-block login-btn"
                onclick="addSearchResult('${data.name}', '${data.premiered}', '${data.status}', '${data.language}', '${data.summary}')"
                data-dismiss="modal"
              >
                Yes
              </button>
              <button
                id="my_submit_button"
                class="btn btn-primary btn-block login-btn"
                data-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
            containerResults.append(cardImageInfo);
        });
    }  
}

function addSearchResult(name, premiered, status, language, summary) {
    var url = '/save'
    $.ajax({url:url, type: "POST", data: {name:name, premiered:premiered, status:status, language:language, summary:summary}}).then(data => {
        // console.log("ajax data", data)
        alert("Your data was successfully stored!");
    }).catch(err => {
        console.log(err);
    })
}