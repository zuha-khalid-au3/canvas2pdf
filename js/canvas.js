window.onload = () => {
  const canvas = document.getElementById('canvas');
  const saveButton = document.getElementById('save');
  const loadInput = document.getElementById('load');

  new Drawing(canvas, saveButton, loadInput);
};

class Drawing {
  constructor(canvas, saveButton, loadInput) {
    this.isDrawing = false;

    canvas.addEventListener('mousedown', () => this.startDrawing());
    canvas.addEventListener('mousemove', (e) => this.draw(e));
    canvas.addEventListener('mouseup', () => this.stopDrawing());

    saveButton.addEventListener('click', () => this.save());
    loadInput.addEventListener('change', (event) => this.load(event));

    const rect = canvas.getBoundingClientRect();

    this.offsetLeft = rect.left;
    this.offsetTop = rect.top;

    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }
  startDrawing() {
    this.isDrawing = true;
  }
  stopDrawing() {
    this.isDrawing = false;
  }
  draw(event) {
    if (this.isDrawing) {
      this.context.fillRect(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, 6, 6);
    }
  }
  save() {
    $('#save').click(function() {       
        html2canvas($("#canvas"), {
            onrendered: function(canvas) {         
                var imgData = canvas.toDataURL(
                    'image/png');        //converting first to PNG then to PDF inorder to store created content      
                var doc = new jsPDF('p', 'mm');
                doc.addImage(imgData, 'PNG', 10, 10);
                doc.save('canvas.pdf');
            }
        });
    });
  }
  load(event) {
    const file = [...event.target.files].pop();
    this.readTheFile(file)
      .then((image) => this.loadTheImage(image))
  }
  loadTheImage(image) {
    const img = new Image();
    const canvas = this.canvas;
    img.onload = function () {
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
    img.src = image;
  }
  readTheFile(file) {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    })
  }
}