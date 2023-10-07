const express = require("express");
const { distribute } = require("gsap");
const path = require("path");
const app = express();

const baseStaticPath = path.resolve(__dirname, "dist");
app.use("/static", express.static(path.resolve(__dirname, "../dist")));
console.log(baseStaticPath);
app.get("/*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../dist"));
});

app.listen(process.env.PORT || 5050, () => {
	console.log(`server Started on http://loaclhost:5050`);
});
