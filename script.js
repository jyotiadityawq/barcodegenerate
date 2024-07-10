let input = document.getElementById("input");
let btnGenerate = document.getElementById("btn-barcode-generator");
let btnDownload = document.getElementById("btn-download-barcode");

btnGenerate.addEventListener("click", () => {
    JsBarcode("#barcode", input.value, {
        format: "code128",
        displayValue: true,
        fontSize: 24,
        lineColor: "#000",
    });
    btnDownload.style.display = "inline";
});

btnDownload.addEventListener("click", () => {
    let svg = document.getElementById("barcode");
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    let data = new XMLSerializer().serializeToString(svg);
    let svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    let url = URL.createObjectURL(svgBlob);

    let image = new Image();
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        URL.revokeObjectURL(url);
        let imgURI = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        let link = document.createElement("a");
        link.download = "barcode.png";
        link.href = imgURI;
        link.click();
    };
    image.src = url;
});

window.onload = () => {
    input.value = "";
    btnDownload.style.display = "none";
};
