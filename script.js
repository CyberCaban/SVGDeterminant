const form = document.querySelector("form");
const size = document.getElementById("size");
const speed = document.getElementById("speed");
const speedDefault = document.querySelector(".speed-default");
const download = document.querySelector(".download");
const svgWrapper = document.querySelector(".svgWrapper");

let width = 50;
let height = 50;
let dim = 3;
let animationSpeed = factorial(dim);
const threshold = 7;

function factorial(n) {
  var result = 1;
  while (n) {
    result *= n--;
  }
  return result;
}

function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur,
      memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

function transposeMatrix(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

function generateAnimationValues(width, n) {
  let elements = [];
  for (let i = 0; i < n; i++) {
    elements.push(String(i));
  }

  const permArray = permutator(elements);
  const transposed = transposeMatrix(permArray.sort());

  const res = transposed.map((mults) =>
    mults
      .map(
        (mult) =>
          String(parseInt(mult) * width) + ";" + String(parseInt(mult) * width)
      )
      .toString()
      .replace(/,/g, ";")
  );

  console.log(res);
  return res;
}

function buildElements(width, height, dim) {
  const elements = [];
  const animationFramesX = generateAnimationValues(width, dim);

  let animationFramesFill = animationFramesX[0].split(";");
  for (let i = 0; i < animationFramesFill.length; i += 2) {
    if (i % 4) {
      animationFramesFill[i] = "red";
      animationFramesFill[i + 1] = "red";
    } else {
      animationFramesFill[i] = "blue";
      animationFramesFill[i + 1] = "blue";
    }
  }

  animationFramesFill = animationFramesFill.toString().replace(/,/g, ";");

  for (let i = 0; i < dim; i++) {
    elements.push(
      `<rect width = "${width}" height = "${height}" x = "${i * width}" y = "${
        i * height
      }" fill = "blue">
        <animate
          attributeName="x"
          values="${animationFramesX[i]}"
          dur="${animationSpeed}s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill"
          values="${animationFramesFill}"
          dur="${animationSpeed}s"
          repeatCount="indefinite"
        />
      </rect>`
    );
  }

  return elements;
}

function render(dim, elements) {
  svgWrapper.classList.add("border-4");
  svgWrapper.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${
    dim * width
  }" height="${dim * height}">
        ${elements.map((item) => item)}
    </svg>`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  dim = e.target.dimensions.value;
  if (
    dim >= threshold &&
    confirm(
      "Are you sure? \nDimensions more than 7 may greatly affect your performance!"
    )
  ) {
    const elements = buildElements(width, height, dim);

    render(dim, elements);
  } else if (dim < threshold) {
    const elements = buildElements(width, height, dim);

    render(dim, elements);
  }
  download.classList.remove("hidden");
});

size.addEventListener("change", (e) => {
  e.preventDefault();

  width = height = e.target.value;

  const elements = buildElements(width, height, dim);

  render(dim, elements);
});

speed.addEventListener("change", (e) => {
  e.preventDefault();

  animationSpeed = 1 / e.target.value;
  console.log(animationSpeed);

  const elements = buildElements(width, height, dim);

  render(dim, elements);
});

speedDefault.addEventListener("click", () => {
  animationSpeed = factorial(dim);

  speed.value = 0.2;

  const elements = buildElements(width, height, dim);

  render(dim, elements);
});

download.addEventListener("click", (e) => {
  console.log(svgWrapper.innerHTML);
  if (!svgWrapper.innerHTML) {
    e.preventDefault();
    return;
  }
  const file = new File([svgWrapper.innerHTML], "det.svg");
  download.href = URL.createObjectURL(file);
  download.download = "dev.svg";
});
