const vagaRequisitos = document.querySelector("#vagaRequisitos");

vagaRequisitos.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    const start = this.selectionStart;
    const end = this.selectionEnd;
    const text = this.value;
    let before, after;
    if (start === 0) {
      before = "• ";
      after = text.substring(end, text.length);
    } else {
      before = text.substring(0, start);
      after = text.substring(end, text.length);
      before = before.replace(/\n$/, "");
      before = `${before}\n• `;
    }
    this.value = `${before}${after}`;
    this.selectionStart = this.selectionEnd = start + 3;
  }
});

vagaRequisitos.value = "• ";
