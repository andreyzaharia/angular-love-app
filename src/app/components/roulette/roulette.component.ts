import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'components-roulette',
  templateUrl: './roulette.component.html',
  styleUrl: './roulette.component.css',
})
export class RouletteComponent {
  //Accede al elemento <canvas> definido en el HTML usando una referencia. Esto permite manipular el canvas directamente en TypeScript.
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  //Este será el contexto 2D del canvas que usaremos para dibujar la ruleta.
  private ctx!: CanvasRenderingContext2D;
  public options = ['Besitos ahi abajo..'];
  // El ángulo inicial desde el que comenzamos a dibujar la primera sección de la ruleta.
  private startAngle = 0;
  //Calcula el ángulo que cubre cada sección de la ruleta dividiendo el círculo entre el número de opciones. Esto se calcula en radianes (2π es un círculo completo).
  private arc = Math.PI / (this.options.length / 2);
  private spinAngleStart = 0; //Controla el ángulo inicial del giro.
  private spinTime = 0; //Tiempo que ha pasado desde que se inició el giro.
  private spinTimeTotal = 0; //El tiempo total que durará el giro.
  private isSpinning = false; //Indica si la ruleta está girando actualmente.
  private colors = ['#fdf0d5', '#eef4ed', '#fcf6bd', '#c8b6ff', '#ffb3c6']; // Amarillo, Rojo, Azul

  private canvasSize = 500; // Tamaño base del canvas
  //Estos radios se calcularán según el tamaño del canvas y serán usados para dibujar los diferentes elementos del círculo.
  private outsideRadius!: number;
  private textRadius!: number;
  private insideRadius!: number;

  public newOption: string = ''; // Nueva opción que se añade a través del input

  constructor(private messageService: MessageService) {}


  ngOnInit(): void {
    this.resizeCanvas();
    this.drawRouletteWheel();
  }

  // Detectar cambio de tamaño de la pantalla
  @HostListener('window:resize', ['$event']) //Escucha eventos del navegador, como el cambio de tamaño de la ventana.
  onResize() {
    this.resizeCanvas();
    this.drawRouletteWheel(); // Redibujar al redimensionar
  }

  resizeCanvas() {
    const canvasElement = this.canvas.nativeElement;
    const containerWidth = canvasElement.parentElement?.offsetWidth || 500; // Obtener el ancho del contenedor
    this.canvasSize = containerWidth < 500 ? containerWidth : 500; // Limitar a un máximo de 500px

    canvasElement.width = this.canvasSize;
    canvasElement.height = this.canvasSize;

    this.ctx = this.canvas.nativeElement.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    // Redimensionar el radio basado en el tamaño del canvas
    // Calcula el radio exterior de la ruleta. Se resta 10 para dejar un margen del borde del canvas.
    this.outsideRadius = this.canvasSize / 2;
    // Calcula el radio donde se colocará el texto. Es ligeramente menor que el radio exterior.
    this.textRadius = this.outsideRadius / 1.5;
    // Calcula el radio interior de la ruleta, es decir, el círculo que queda vacío en el centro.
    this.insideRadius = this.canvasSize / 50;
  }

  generateRandomColor(): string {
    // Genera un número aleatorio entre 0 y 255 y lo convierte a hexadecimal con dos dígitos.
    const getRandomHex = () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, '0');

    // Combina los valores generados para rojo, verde y azul.
    const red = getRandomHex();
    const green = getRandomHex();
    const blue = getRandomHex();

    // Retorna el color en formato hexadecimal.
    return `#${red}${green}${blue}`;
  }

  drawRouletteWheel() {
    const canvas = this.canvas.nativeElement;
    // Limpia el canvas antes de redibujar
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;

    for (let i = 0; i < this.options.length; i++) {
      // Calcula el ángulo para cada sección
      const angle = this.startAngle + i * this.arc;
      this.ctx.fillStyle = this.colors[i % this.colors.length]; // Alternar colores

      // Dibuja cada sección de la ruleta
      this.ctx.beginPath();
      this.ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        this.outsideRadius,
        angle,
        angle + this.arc,
        false
      );
      this.ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        this.insideRadius,
        angle + this.arc,
        angle,
        true
      );
      this.ctx.fill();
      this.ctx.stroke();

      // Dibuja el texto de cada sección
      this.ctx.save();
      this.ctx.fillStyle = 'black';

      // Calcula la posición del texto
      const textX =
        canvas.width / 2 + Math.cos(angle + this.arc / 2) * this.textRadius;
      const textY =
        canvas.height / 2 + Math.sin(angle + this.arc / 2) * this.textRadius;

      // Mueve el contexto al centro de la sección
      this.ctx.translate(textX, textY);

      // Calcula la rotación para que el texto esté horizontal
      const angleOffset = angle + this.arc / 2;
      this.ctx.rotate(angleOffset + Math.PI / -1); // Ajusta la rotación para texto horizontal

      // Ajusta el tamaño del texto para que quepa dentro del segmento
      const maxTextWidth = this.arc * this.textRadius * 2; // Ancho máximo del texto en el segmento
      const fontSize = Math.min(
        this.canvasSize / 30,
        (maxTextWidth / this.options[i].length) * 1.5
      ); // Tamaño máximo del texto

      this.ctx.font = `bold ${fontSize}px Arial`;
      this.ctx.textAlign = 'center'; // Centra el texto horizontalmente
      this.ctx.textBaseline = 'middle'; // Centra el texto verticalmente

      // Divide el texto en múltiples líneas si es necesario
      const words = this.options[i].split(' ');
      let line = '';
      const lineHeight = fontSize * 1.2; // Altura de línea del texto
      let y = 0;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = this.ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxTextWidth) {
          this.ctx.fillText(line.trim(), 0, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      this.ctx.fillText(line.trim(), 0, y);

      // Restaura el contexto a su estado original
      this.ctx.restore();
    }

    // Dibuja la flecha
    this.ctx.fillStyle = 'black';
    this.ctx.beginPath();
    this.ctx.moveTo(
      canvas.width / 2 - 10,
      canvas.height / 2 - (this.outsideRadius + 10)
    );
    this.ctx.lineTo(
      canvas.width / 2 + 10,
      canvas.height / 2 - (this.outsideRadius + 10)
    );
    this.ctx.lineTo(
      canvas.width / 2,
      canvas.height / 2 - (this.outsideRadius - 30)
    );
    this.ctx.fill();
  }

  spin() {
    if (!this.isSpinning) {
      this.spinAngleStart = Math.random() * 10 + 10;
      this.spinTime = 0;
      this.spinTimeTotal = Math.random() * 3000 + 4000;
      this.isSpinning = true;
      this.rotate();
    }
  }

  rotate() {
    this.spinTime += 30;

    if (this.spinTime >= this.spinTimeTotal) {
      this.isSpinning = false;
      this.stopRotateWheel();
    } else {
      const spinAngle = this.easeOut(
        this.spinTime,
        0,
        this.spinAngleStart,
        this.spinTimeTotal
      );
      this.startAngle += (spinAngle * Math.PI) / 180;
      this.drawRouletteWheel();
      requestAnimationFrame(() => this.rotate());
    }
  }

  addSingle(msg: string, detail: string) {
    this.messageService.add({
      severity: 'info',
      summary: msg,
      detail: detail,
      life: 3000
    });
  }

  stopRotateWheel() {
    const degrees = (this.startAngle * 180) / Math.PI + 90;
    const arcd = (this.arc * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);
    this.addSingle('El reto es..', this.options[index]);
    //alert(`La opción seleccionada es: ${this.options[index]}`);
  }

  /**
   * t (time): Tiempo actual de la animación, que va aumentando conforme pasa el tiempo.
     b (beginning value): El valor inicial, en este caso, el ángulo de inicio del giro.
     c (change in value): La cantidad de cambio entre el valor inicial y el valor final (es decir, el rango total de la animación).
     d (duration): El tiempo total que durará la animación.
   */
  easeOut(t: number, b: number, c: number, d: number) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  }

  addOption() {
    console.log(this.options);
    const newOptionTrimmed = this.newOption.trim();
    if (newOptionTrimmed && !this.options.includes(newOptionTrimmed)) {
      this.colors.push(this.generateRandomColor());
      this.options.push(newOptionTrimmed);
      this.newOption = '';
      // Recalcula el ángulo por sección
      this.arc = Math.PI / (this.options.length / 2);
      this.drawRouletteWheel();
    } else if (this.options.includes(newOptionTrimmed)) {
      alert('La opción ya existe en la ruleta.');
    } else {
      alert('La opción no puede estar vacía.');
    }
  }
}
