Webcam.set
({
   width:350,
   height:260,
   image_format: 'png',
   flip_horiz: true,
   png_quality: 1000
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function takeShot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="capturedImage" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/2iqlI-icJ/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}

function checkShot()
{
    img=document.getElementById("capturedImage");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("resultEmotion").innerHTML=results[0].label;
        document.getElementById("resultEmotion2").innerHTML=results[1].label;

        if(results[0].label=="Happy")
        {
            document.getElementById("updateEmoji").innerHTML="😊"; 
        }
        if(results[0].label=="Sad")
        {
            document.getElementById("updateEmoji").innerHTML="😫"; 
        }
        if(results[0].label=="Angry")
        {
            document.getElementById("updateEmoji").innerHTML="😠"; 
        }
        if(results[1].label=="Happy")
        {
            document.getElementById("updateEmoji2").innerHTML="😊"; 
        }
        if(results[1].label=="Sad")
        {
            document.getElementById("updateEmoji2").innerHTML="😫"; 
        }
        if(results[1].label=="Angry")
        {
            document.getElementById("updateEmoji2").innerHTML="😠"; 
        }
    }
}