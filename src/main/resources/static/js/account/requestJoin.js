const joinForm = document.getElementById("joinForm")
const requestJoinBtn = document.getElementById("requestJoinBtn")
const resultEmail = document.getElementById("resultEmail")
const resultName = document.getElementById("resultName")
const confirmMsg = document.getElementById("confirmMsg")

// 가입정보
// const empName = sessionStorage.getItem("empName")
// const empBirth = sessionStorage.getItem("empBirth")
// const empEmail = sessionStorage.getItem("empEmail")
// const empPw = sessionStorage.getItem("empPw")

const empInfoKey = ["empEmail", "empName", "empBirth", "empPw"];
let empInfo = {}
empInfoKey.forEach((list) => {
    // empInfo.push(sessionStorage.getItem(list))
    empInfo[list] = sessionStorage.getItem(list);
});

console.log(empInfo)

const handleSubmit = (e) => {
    e.preventDefault()

    confirmMsg.classList.add("info")
    confirmMsg.innerText = "가입 요청이 성공적으로 전송되었습니다. 관리자가 승인하면 로그인할 수 있습니다."
}

const sendEmpInfo = async () => {
    const response = await fetch(`${serverUrl}/emp`, {
        method: "POST",
        headers: {contentType: "application/json"},
        // body: JSON.stringify({empName, empBirth, empEmail, empPw})
    })
    try {
        if (response.status === 200) {
            const data = response.json()
            console.log(data)
        }
    } catch(error) {
        console.log(error)
    }
}

joinForm.addEventListener("click", handleSubmit)

document.addEventListener("DOMContentLoaded", () => {
    // resultEmail.innerText = sessionStorage.getItem("empEmail")
    // resultName.innerText = empInfo.empName
})