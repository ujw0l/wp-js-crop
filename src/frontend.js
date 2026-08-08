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
        let top = parseFloat(img.offsetTop)+x.y;
        let box =  document.createElement('span');
        box.classList.add('crop-rect');
        box.id = `crop-box-${i}`;
        box.setAttribute('data-start-xy',x.x+','+x.y);
        box.style = `left:${left }px;top:${top}px;height:${x.height}px;width:${x.width}px;position:absolute;border: 1px dotted rgba(255,255,255,1);z-index:${1000*i}`;

        let cropButton = document.createElement('span');

        
cropButton.innerHTML = `
<svg width="20" height="20" viewBox="0 0 24 24"
     fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round"
     stroke-linejoin="round">
    <path d="M6 2v14a2 2 0 0 0 2 2h14"/>
    <path d="M18 22V8a2 2 0 0 0-2-2H2"/>
</svg>`;
cropButton.title = 'Crop image';
cropButton.setAttribute('aria-label', 'Crop image');

cropButton.style.cssText = `
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;
    border: 1px solid rgba(255,255,255,0.55);
    border-radius: 10px;

    background: rgba(20,20,20,0.72);
    color: #fff;

    font-size: 20px;
    line-height: 1;

    cursor: pointer;
    user-select: none;

    box-shadow:
        0 4px 12px rgba(0,0,0,0.28),
        inset 0 1px 0 rgba(255,255,255,0.12);

    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);

    transition:
        transform 0.15s ease,
        background 0.15s ease,
        box-shadow 0.15s ease;
`;

cropButton.addEventListener('mouseenter', () => {
    cropButton.style.background = 'rgba(0,0,0,0.88)';
    cropButton.style.transform = 'scale(1.08)';
    cropButton.style.boxShadow = '0 6px 16px rgba(0,0,0,0.35)';
});

cropButton.addEventListener('mouseleave', () => {
    cropButton.style.background = 'rgba(20,20,20,0.72)';
    cropButton.style.transform = 'scale(1)';
    cropButton.style.boxShadow =
        '0 4px 12px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)';
});

cropButton.addEventListener('mousedown', () => {
    cropButton.style.transform = 'scale(0.94)';
});

cropButton.addEventListener('mouseup', () => {
    cropButton.style.transform = 'scale(1.08)';
});

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

                    buttonText: '🤖',
                    buttonTitle: 'Smart Crop',
                    callBack : jsCropSmartCrop,
                    },{
                    buttonText: '&#9729;',
                    buttonTitle: 'Upload Image',
                    callBack: (imgBlob, cropParams) => {

                    let ajaxUrl = cont.getAttribute('data-ajax-url'); 

                        var xhttp = new XMLHttpRequest();
                        xhttp.open("POST", ajaxUrl , true);
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