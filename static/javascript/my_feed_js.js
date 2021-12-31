function logout() {
    $.removeCookie('mytoken');
    alert('로그아웃!')
    window.location.href = '/login'
}

function like(data) {
    console.log(document.getElementById(`${data.alt}likey`).innerText)
    let likey = Number(document.getElementById(`${data.alt}likey`).innerText.split('명')[0])
    console.log()
    if (data.attributes[3].value === 'like@3x.png') {
        data.setAttribute('src', 'like@4x.png')
        document.getElementById(`${data.alt}likey`).innerText = `${String(likey + 1)}명`
    } else {
        data.setAttribute('src', 'like@3x.png')
        document.getElementById(`${data.alt}likey`).innerText = `${String(likey - 1)}명`
    }
}

function like_test(){

}