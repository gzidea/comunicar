        function iniciarFB() {
            var firebaseConfig = {
                apiKey: "AIzaSyCDzxGv1M4HSKzFmIAqrJF0tQ-rXhWvc6Q",
                authDomain: "reservar-46fac.firebaseapp.com",
                databaseURL: "https://reservar-46fac-default-rtdb.firebaseio.com",
                projectId: "reservar-46fac",
                storageBucket: "reservar-46fac.appspot.com", 
                messagingSenderId: "765694385966",
                appId: "1:765694385966:web:93acc0317ec48f8570a4bf",
                measurementId: "G-40MH1DJD17"
            };
            // Initialize Firebase
            console.log("Inicando base de dato");
            firebase.initializeApp(firebaseConfig);
        }

        function upLoadImagenFB(titulo,fecha, mensaje, files) {
            var tmpDate = new Date(); 
            var ImgName = tmpDate.getTime();  //Devuelve el numero entero.
            //var titulo = document.getElementById('titulonoticia').value;
            //var fecha = document.getElementById('fechanoticia').value;
            //var mensaje = $('#txt-content').Editor('getText');

            console.log('Genero la fecha '+fecha);

            var uploadTask = firebase.storage().ref('imagen/'+ImgName+'.png').put(files[0]);
            uploadTask.on('state_changed', function(snapshot){
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                //var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //document.getElementById('UpProgress').innerHTML='Cargando '+progress+'%';
                //console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
            }, function(error) {
                // Handle unsuccessful uploads
                console.log('Error:'+error);
            }, function() {
                console.log('Cargo correctamente');
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    ImgUrl = downloadURL;
                    console.log('UTL: '+ImgUrl);
                    firebase.database().ref('PictureNew/'+ImgName).set({
                        id: ImgName,
                        utlimagen: ImgUrl,
                        titulo: titulo,
                        fecha: fecha,
                        mensjae: mensaje
                    });
                    alert('Nota publicada correctamente');
                });

            });
        }
        



