window.addEventListener('load', () => {


    var jCrop = new jsCrop('#upload-img', { saveButton: false }, [{
        buttonText: '&#9729;',
        buttonTitle: 'Upload Image',
        relParam: js_crop_params,
        callBack: (imgBlob, cropParams) => {


            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", cropParams.my_ajax_url, true);
            xhttp.responseType = "text";
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
            xhttp.addEventListener('load', response => {

                if (event.target.status >= 200 && event.target.status < 400) {

                    console.log(event.target.response);
                } else {
                    alert(event.target.response);
                }

            })
            xhttp.send("action=process_image&blob=" + imgBlob);

        }
    }]);
    let uploadBtn = document.querySelector("#upload-img")
    let browseImg = document.querySelector("#browse-image");
    let imgLoadDiv = document.querySelector('#image-load');
    browseImg.addEventListener('click', () => uploadBtn.click());

    imgLoadDiv.addEventListener("dragover", (event) => event.preventDefault());
    imgLoadDiv.addEventListener('drop', (event) => {
        event.preventDefault();
        let img = event.dataTransfer.files[0]
        if (FileReader) {
            let reader = new FileReader();
            reader.readAsDataURL(img);
            reader.addEventListener('load', event => {
                let dropedImg = new Image();
                dropedImg.src = event.target.result;
                dropedImg.addEventListener('load', event => jCrop.createOverlay(event.target), { saveButton: false }, [{
                    buttonText: '&#9729;',
                    buttonTitle: 'Upload Image',
                    relParam: js_crop_params,
                    callBack: (imgBlob, cropParams) => {

                    }
                }]);
            });

        }
    })



});