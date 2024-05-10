var form = document.getElementById("myForm")
var imgInput = document.querySelector(".img")
var file = document.getElementById("imgInput")
var userName = document.getElementById("name")
var age = document.getElementById("age")
var city = document.getElementById("city")
var email = document.getElementById("email")
var phone = document.getElementById("phone")
var sDate = document.getElementById("sDate")
var submitBtn = document.querySelector(".submit")
var userInfo = document.getElementById("data")
var modal = document.getElementById("userForm")
var modalTitle = document.querySelector("#userForm .modal-title")
var newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []
 let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "./image/imgUser.png"
    form.reset()
    
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is very large")
    }
}



function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
             <td>${element.startDate}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}','${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(pictureProfile, name, age, city, email, phone,  sDate){
    document.querySelector('.showImg').src = pictureProfile,
    document.querySelector('#showName').value = name,
    document.querySelector("#showAge").value = age,
    document.querySelector("#showCity").value = city,
    document.querySelector("#showEmail").value = email,
    document.querySelector("#showPhone").value = phone,
    document.querySelector("#showsDate").value = sDate
}


function editInfo(index, pictureProfile, name, Age, City, Email, Phone, Sdate){
    isEdit = true
    editId = index
    imgInput.src = pictureProfile
    userName.value = name
    age.value = Age
    city.value =City
    email.value = Email,
    phone.value = Phone,
    sDate.value = Sdate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        picture: imgInput.src == undefined ? "./image/imgUser.png" : imgInput.src,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
         startDate: sDate.value
    }
    

    if(!isEdit){
        getData.push(information)
     }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))
 
    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    imgInput.src = "./image/imgUser.png"  

 })