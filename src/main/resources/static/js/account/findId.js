const findIdForm = document.getElementById("findIdForm")
const inputFindId = document.getElementById("inputFindId")
const resultContainer = document.querySelector(".result-container")
const findIdTitle = document.querySelector(".find-id-title")
const nextBtn = document.querySelector(".primary-btn")
const errorMessage = document.querySelector(".message")

const showError = (message) => {
    errorMessage.classList.remove("info");
    errorMessage.classList.add("error", "on");
    errorMessage.innerText = message;
};

const handleGoToLogin = () => {
    location.href = "/login"
}

const handleSubmit = (e) => {
    e.preventDefault()
    if (inputFindId.value.trim() === "") {
        showError("사번을 입력해 주세요.")
        return
    }

    if (inputFindId.value.trim() !== "123") {
        showError("입력하신 사번과 일치하는 정보가 존재하지 않습니다.")
        return
    }

    if (inputFindId.value === "123") {
        resultContainer.classList.add("complete")
        findIdTitle.innerText = "아이디 찾기 결과"
        nextBtn.innerText = "로그인"
        findIdForm.classList.add("off")
        nextBtn.addEventListener("click", handleGoToLogin)
    }
}

findIdForm.addEventListener("submit", handleSubmit)