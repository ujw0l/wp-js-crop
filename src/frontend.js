import {jsCrop} from "js-crop";
import {load, YOLO_V5_N_COCO_MODEL_CONFIG} from 'yolov5js'

window.addEventListener("DOMContentLoaded", () => {
    
    const  jsCropSmartCrop = async(imgBlob)=>{
       const model = await load(YOLO_V5_N_COCO_MODEL_CONFIG);
       let img =  document.querySelector('#js-crop-image');
       let parEl = img.parentElement;
       const detections = await model.detect(img);


        /** 
     * End crop on crop button click
    */


  const   endCrop = (cropRect )=> {

  
        
        if (undefined != cropRect) {
            let startCo = cropRect.getAttribute('data-start-xy').split(',');
            let cropImg = document.querySelector('#js-crop-image');
            let curCropStep = parseInt(cropImg.getAttribute('data-crop-step')) + 1;
            let cropStepCount = parseInt(cropImg.getAttribute('data-crop-count'));
            let origImgRatio = cropImg.getAttribute('data-dim-ratio').split(',');
            let overlayDiv = document.querySelector('#js-crop-overlay');
            let imgQuality = parseFloat(cropImg.getAttribute('data-img-quality'));
            let imgType = `'image/${cropImg.getAttribute('data-img-type')}`;


            let tempCanv = document.createElement('canvas');
            let tempCtx = tempCanv.getContext('2d');
            let imgHtRatio = parseFloat(origImgRatio[1]);
            let imgWdRatio = parseFloat(origImgRatio[0]);
            let cropImgWd = cropRect.offsetWidth * imgWdRatio;
            let cropImgHt = cropRect.offsetHeight * imgHtRatio;
            cropImg.style.margin = `${((overlayDiv.offsetHeight - cropRect.offsetHeight) / 2)}px ${(((0.97 * overlayDiv.offsetWidth) - cropRect.offsetWidth) / 2)}px`;
            cropImg.style.cursor = '';
            tempCanv.height = cropRect.offsetHeight;
            tempCanv.width = cropRect.offsetWidth;
            cropImg.setAttribute('data-dim-ratio', '1,1');
            cropImg.height = cropRect.offsetHeight;
            cropImg.width = cropRect.offsetWidth;
            tempCtx.imageSmoothingEnabled = true;
            tempCtx.imageSmoothingQuality = 'high';
            tempCtx.drawImage(cropImg, (parseInt(startCo[0]) * imgWdRatio), ((parseInt(startCo[1])) * imgHtRatio), cropImgWd, cropImgHt, 0, 0, cropRect.offsetWidth, cropRect.offsetHeight);
            let imgBlob = tempCanv.toDataURL(imgType, imgQuality);
            cropImg.setAttribute('data-crop-step', curCropStep);
            cropImg.setAttribute('data-crop-' + curCropStep, imgBlob);
            cropImg.setAttribute('data-crop-count', curCropStep);

            cropImg.src = imgBlob;
            cropImg.removeAttribute('data-start-co');
            overlayDiv.removeChild(cropRect);

            for (let i = (curCropStep + 1); i <= cropStepCount; i++) {
                cropImg.removeAttribute('data-crop-' + i);
            }
        }

    }

       detections.map((x,i)=>{
        let left = parseFloat(img.offsetLeft) + x.x;
        let top = parseFloat(img.offsetTop)+x.y+35;
        let box =  document.createElement('span');
        box.classList.add('crop-rect');
        box.id = `crop-box-${i}`;
        box.setAttribute('data-start-xy',x.x+','+x.y);
        box.style = `left:${left }px;top:${top}px;height:${x.height-8}px;width:${x.width}px;position:absolute;border: 1px dotted rgba(255,255,255,1);z-index:${1000*i}`;

        let cropButton = document.createElement('span');

        
        cropButton.innerHTML = '&#9986;';
        cropButton.style = `font-size:25px;height:20px;width:30px; background-color:rgba(255,255,255,1);color:rga(0,0,0,1);border-radius:25%;cursor:pointer;`;
        cropButton.title = 'Crop';
        cropButton.addEventListener('click',(e)=>{
            endCrop(box);
            Array.from(document.querySelectorAll('.crop-rect')).map(x=>x.remove())
        });
        box.appendChild(cropButton);
        parEl.appendChild(box);
       });
    }
   







    let cont = document.querySelector('#image-load');

    var jCrop = new jsCrop('#upload-img', { 
        saveButton: false,
        customColor: {
            overlayBgColor : cont.style.backgroundColor,
            toolbarBgColor: cont.querySelector('p').style.color,
            buttonBgColor: cont.querySelector('p').style.color,
            buttonFontColor : cont.style.backgroundColor ,

        }
        
    }, [{

        buttonText: '🤖',
        buttonTitle: 'Smart Crop',
        callBack : jsCropSmartCrop,
        },{
        buttonText: '&#9729;',
        buttonTitle: 'Upload Image',
        callBack: (imgBlob, cropParams) => {



            let ajaxUrl = cont.getAttribute('data-ajax-url'); 

            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", ajaxUrl, true);
            xhttp.responseType = "text";
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
            xhttp.addEventListener('load', event => {

                if (event.target.status >= 200 && event.target.status < 400) {

                    alert(event.target.response);
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
                dropedImg.addEventListener('load', event => jCrop.createOverlay(event.target, { 
                    saveButton: false , 
                    customColor: {
                        overlayBgColor : cont.style.backgroundColor,
                        toolbarBgColor: cont.querySelector('p').style.color,
                        buttonBgColor:cont.querySelector('p').style.color,
                        buttonFontColor : cont.style.backgroundColor ,
            
                    }
                
                }, [{
                    buttonText: '&#9729;',
                    buttonTitle: 'Upload Image',
                    relParam: js_crop_params,
                    callBack: (imgBlob, cropParams) => {

                        var xhttp = new XMLHttpRequest();
                        xhttp.open("POST", cropParams.my_ajax_url, true);
                        xhttp.responseType = "text";
                        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
                        xhttp.addEventListener('load', event => {

                            if (event.target.status >= 200 && event.target.status < 400) {

                                alert(event.target.response);
                            } else {
                                alert(event.target.response);
                            }

                        })
                        xhttp.send("action=process_image&blob=" + imgBlob);


                    }
                }]));
            });

        }
    })



});