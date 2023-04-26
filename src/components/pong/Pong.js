import { useEffect, useRef } from "react";
import classes from "./Pong.module.scss"


function draw(canvas) {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgb(200, 0, 0)";
  context.fillRect(10, 10, 50, 50);
  window.requestAnimationFrame(() => draw(canvas));
}


export default function Pong() {
  const canvasRef = useRef(null);

  function resized() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth.clientWidth;
    canvas.height = window.innerHeight.clientHeight;
  }

  const resizeObserver = new ResizeObserver(entries => {
    for(const entry of entries) {
      const element = entry.target;
      if(element.tagName == "CANVAS") {
        draw(element);
        resized();
      }
    }
  });


  useEffect(() => {
    const canvas = canvasRef.current;
    draw(canvas);
    resized();

    resizeObserver.observe(canvas);
  }, []);

  return (
    <div className={classes["pong"]}>
      <canvas ref={canvasRef} />
    </div>
  );
}
