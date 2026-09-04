// darkmode 토글 버튼 가져오기
const checkbox = document.getElementById('checkbox');

// dark라는 접두사를 활성화하기 위해서는 <html class='dark'>와 같이 적용해야함
// 화이트모드일 때는 <html>, 다크모드일 때는 <html class='dark'>
const html = document.querySelector('html');

// checkbox가 체크되면 다크모드 활성화
checkbox.addEventListener('click', () => {
    checkbox.checked ? html.classList.add('dark') : html.classList.remove('dark');
});