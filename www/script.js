console.log("Hello World")
const endpoint = "https://6967cbc9bbe157c088b309a3.mockapi.io/api/student";

async function getStudents(){
    let respose = await fetch(endpoint)
    let data = await respose.json();

    console.log(data)
    return data;
}
async function registerStudent(e){
    e.preventDefault()
       let form = e.target.elements
       let user = {
        name: form.name.value,
        gender: form.gender.value,
        rollNo: form.rollNo.value,
        address: form.address.value,
        contactInfo: form.contactInfo.value,
       }
       let res = await fetch(endpoint, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
       })


}

function createListItem(data){
    let list = document.createElement("li")
    list.classList.add("student-list")

    let para = document.createElement("p")
    para.textContent = data.rollNo;
}

function getStatus(data){
    if(data.isHere == true){
        return "Student Present"
    }else{
        return "Mark Present"
    }
}

function setStatusText(data, ele){
    if (data.isHere == true){
        ele.textContent = "isHere"
        ele.classList.add("present")
    }else{
        ele.textContent = "isAbsent"
        ele.classList.add("absent")
    }
}

async function updateStudent( id, data ){

    let api = endpoint + "/"+ id;

    let res = await fetch(api,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
    })
    return await res.json()
}




function togglePresent(student, btn){



    updateStudent(student.id, { isHere: !student.isHere   })
    displayStudents()
}


async function deleteStudents(id){
    let api = endpoint + "/"+ id;
    let res = await fetch(api,{
        method: "DELETE"
    })
    displayStudents()

}

async function displayStudents(){
    let data = await getStudents();

    let mainlist = document.getElementById("List")
    mainlist.textContent = ""
    for( let i = 0;i < data.length; i++){

    let listItem = document.createElement("li")

    let rollNo = document.createElement("p")
    rollNo.textContent = data[i].rollNo

    let div1 = document.createElement("div")

    let name = document.createElement("p")
    name.textContent = data[i].name

    let gender = document.createElement("p")
    gender.textContent = data[i].gender

    div1.appendChild(name)
    div1.appendChild(gender)

    let div2 = document.createElement("div")

    let phone = document.createElement("p")
    phone.textContent = data[i].phone;
    let address = document.createElement("p")
    address.textContent = data[i].address

    div2.appendChild(phone)
    div2.appendChild(address)
    div2.classList.add("hide-mobile")

    let isHere = document.createElement("p")
    setStatusText(data[i], isHere)

    let boxbutton = document.createElement("div")

    let isHerebutton = document.createElement("button")
    isHerebutton.textContent = getStatus(data[i])
    isHerebutton.classList.add("Green")
    isHerebutton.onclick = () => togglePresent(data[i],
        isHerebutton)

    let removeStudent = document.createElement("button")
    removeStudent.textContent = "Remove Student"
    removeStudent.classList.add("Red")
    removeStudent.onclick = () => deleteStudents(data[i].id)

    boxbutton.appendChild(isHerebutton)
    boxbutton.appendChild(removeStudent)

    boxbutton.classList.add("Button")

    listItem.appendChild(rollNo)
    listItem.appendChild(div1)
    listItem.appendChild(div2)
    listItem.appendChild(isHere)
    listItem.appendChild(boxbutton)
    listItem.classList.add("student-list")

    mainlist.appendChild(listItem)
    }
    document.body.appendChild(mainlist)
}

displayStudents()